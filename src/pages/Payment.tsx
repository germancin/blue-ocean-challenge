import { useLocation, Navigate } from 'react-router-dom';
import { PaymentInformationCard } from '@/components/payment/PaymentInformationCard';
import { PaymentDetailsCard } from '@/components/payment/PaymentDetailsCard';
import { PaymentInstructionsCard } from '@/components/payment/PaymentInstructionsCard';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
	const location = useLocation();
	// Extract the initial payment data from the route state
	const email = location.state?.email;
	const initialPaymentStatus = location.state?.paymentStatus;
	const paymentAmount = location.state?.paymentAmount;
	const navigate = useNavigate();

	// Track the merchant address in state
	const [merchantAddress, setMerchantAddress] = useState('');
	// Track the payment status in state (default to 'pending' if not provided)
	const [currentPaymentStatus, setCurrentPaymentStatus] = useState(initialPaymentStatus || 'pending');
	const [isFirstTime, setIsFirstTime] = useState(false);

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
			// Only run if we have an email and we're still in a 'pending' state
			if (currentPaymentStatus === 'pending' && email) {
				try {
					// Check if there's an existing payment with status 'pending'
					const { data: existingPayment, error: fetchError } = await supabase.from('payments').select('*').eq('email', email).eq('status', 'pending').maybeSingle();

					if (fetchError) {
						throw new Error(fetchError.message);
					}

					if (existingPayment) {
						// Verify the payment via the Supabase Function
						const { data, error: functionError } = await supabase.functions.invoke('verify-payment', {
							body: {
								email,
								amount: existingPayment.amount,
								paymentId: existingPayment.id,
							},
						});

						console.log('verify payment:', data);

						if (functionError) {
							throw new Error(functionError.message);
						}

						if (data.status === 'success') {
							if (!existingPayment.email_sent) {
								const { error: functionError } = await supabase.functions.invoke('check-and-send-emails', {
									body: {
										email: existingPayment.email,
										paymentId: existingPayment.id,
										amount: existingPayment.amount,
									},
								});

								if (functionError) {
									console.error('Failed to sending e-mail:', functionError);
								}

								// Update local state to 'success'
								setCurrentPaymentStatus('success');
								setIsFirstTime(true);
							}
						}
					} else {
						// If there's no pending payment, check if there's one with status 'success'
						const { data: successfulPayment, error: successFetchError } = await supabase.from('payments').select('*').eq('email', email).eq('status', 'success').maybeSingle();

						if (successFetchError) {
							throw new Error(successFetchError.message);
						}

						if (successfulPayment) {
							// If we have a successful payment and email hasn't been sent, send the email now
							if (!successfulPayment.email_sent) {
								const { data, error: functionError } = await supabase.functions.invoke('check-and-send-emails', {
									body: {
										email: successfulPayment.email_sent,
										paymentId: successfulPayment.id,
										amount: successfulPayment.amount,
									},
								});

								if (functionError) {
									console.error('Failed to send email:', functionError);
								}

								if (data?.temporaryPassword) {
									const { error: signInError } = await supabase.auth.signInWithPassword({
										email: existingPayment.email,
										password: data.temporaryPassword,
									});
								}

								// Update local state to 'success'
								setCurrentPaymentStatus('success');
								setIsFirstTime(true);
							} else if (successfulPayment.email_sent) {
								setCurrentPaymentStatus('success');
								setIsFirstTime(false);
							}
						}
					}
				} catch (error) {
					console.error('Error handling pending payment:', error);
				}
			}
		};

		// Check for payment status every 30 seconds
		const intervalId = setInterval(handlePendingPayment, 30000);
		return () => clearInterval(intervalId);
	}, [currentPaymentStatus, email]);

	// If email is missing, redirect to home
	if (!email) {
		return <Navigate to="/" />;
	}

	return (
		<div className="min-h-screen bg-gray-100 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<PaymentInformationCard onAcceptTerms={() => {}} />
					<PaymentDetailsCard amount={paymentAmount} email={email} />
					<PaymentInstructionsCard isFirstTime={isFirstTime} amount={paymentAmount} merchantAddress={merchantAddress} transactionStatus={currentPaymentStatus} />
				</div>
			</div>
		</div>
	);
};

export default Payment;
