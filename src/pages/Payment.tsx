import { useLocation, Navigate } from 'react-router-dom';
import { PaymentInformationCard } from '@/components/payment/PaymentInformationCard';
import { PaymentDetailsCard } from '@/components/payment/PaymentDetailsCard';
import { PaymentInstructionsCard } from '@/components/payment/PaymentInstructionsCard';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
	const location = useLocation();
	const navigate = useNavigate();

	// Extract the payment ID from the URL query parameters
	const searchParams = new URLSearchParams(location.search);
	const subscriberId = searchParams.get('sid');

	const [email, setEmail] = useState('');
	const [paymentAmount, setPaymentAmount] = useState(null);
	const [merchantAddress, setMerchantAddress] = useState('');
	const [currentPaymentStatus, setCurrentPaymentStatus] = useState('pending');

	useEffect(() => {
		const fetchPaymentDetails = async () => {
			if (subscriberId) {
				const { data: subscriber, error: subscriberError } = await supabase.from('subscribers').select('email').eq('id', subscriberId).maybeSingle();

				if (subscriberError) {
					console.error('Error fetching subscriber details:', subscriberError);
					return;
				}

				if (subscriber) {
					const { data: payment, error: paymentError } = await supabase.from('payments').select('*').eq('email', subscriber.email).maybeSingle();

					if (paymentError) {
						console.error('Error fetching payment details:', paymentError);
						return;
					}

					if (payment) {
						setEmail(payment.email);
						setPaymentAmount(payment.amount);
						setCurrentPaymentStatus(payment.status || 'pending');
					}
				}
			}
		};

		fetchPaymentDetails();
	}, [subscriberId]);

	useEffect(() => {
		const fetchMerchantAddress = async () => {
			const {
				data: { MERCHANT_ADDRESS },
				error,
			} = await supabase.functions.invoke('get-merchant-address');

			if (error) {
				console.error('Error fetching merchant address:', error);
				return;
			}
			setMerchantAddress(MERCHANT_ADDRESS);
		};

		fetchMerchantAddress();
	}, []);

	useEffect(() => {
		const handlePendingPayment = async () => {
			if (currentPaymentStatus === 'pending' && email) {
				try {
					const { data: existingPayment, error: fetchError } = await supabase.from('payments').select('*').eq('email', email).eq('status', 'pending').maybeSingle();

					if (fetchError) {
						throw new Error(fetchError.message);
					}

					if (existingPayment) {
						const { data, error: functionError } = await supabase.functions.invoke('verify-payment', {
							body: {
								email,
								amount: existingPayment.amount,
								paymentId: existingPayment.id,
							},
						});

						if (functionError) {
							throw new Error(functionError.message);
						}

						if (data.status === 'success') {
							setCurrentPaymentStatus('success');
						}
					}
				} catch (error) {
					console.error('Error handling pending payment:', error);
				}
			}
		};

		const intervalId = setInterval(handlePendingPayment, 30000);
		return () => clearInterval(intervalId);
	}, [currentPaymentStatus, email]);

	// If no email is found, redirect to home
	if (!email) {
		return <Navigate to="/" />;
	}

	return (
		<div className="min-h-screen bg-gray-100 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<PaymentInformationCard onAcceptTerms={() => {}} />
					<PaymentDetailsCard amount={paymentAmount} email={email} />
					<PaymentInstructionsCard amount={paymentAmount} merchantAddress={merchantAddress} transactionStatus={currentPaymentStatus} />
				</div>
			</div>
		</div>
	);
};

export default Payment;
