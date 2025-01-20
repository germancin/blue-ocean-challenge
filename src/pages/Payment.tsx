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

	// Extract the subscriber ID from the URL query parameters
	const searchParams = new URLSearchParams(location.search);
	const subscriberId = searchParams.get('sid');

	const [email, setEmail] = useState(location.state?.email || '');
	const [paymentAmount, setPaymentAmount] = useState(location.state?.paymentAmount || null);
	const [merchantAddress, setMerchantAddress] = useState('');
	const [currentPaymentStatus, setCurrentPaymentStatus] = useState(location.state?.paymentStatus || 'pending');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log('Fetching payment details for subscriberId:', subscriberId);
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

					if (payment.email && payment.amount && payment.status) {
						setLoading(false);
					}
				}
			}
		};

		fetchPaymentDetails();
	}, [location.search, subscriberId]);

	useEffect(() => {
		console.log('Fetching merchant address...');
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

		const checkDataPresence = () => {
			if (email && paymentAmount && currentPaymentStatus) {
				setLoading(false);
			}
		};

		fetchMerchantAddress();
		checkDataPresence();
	}, [currentPaymentStatus, email, paymentAmount]);

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
								const { data, error: functionError } = await supabase.functions.invoke('check-and-send-emails', {
									body: {
										email: existingPayment.email,
										paymentId: existingPayment.id,
										amount: existingPayment.amount,
									},
								});

								if (data?.link) {
									window.location.href = data?.link;
								}

								if (functionError) {
									console.error('Failed to sending e-mail:', functionError);
								}

								// Update local state to 'success'
								setCurrentPaymentStatus('success');
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

								if (data?.link) {
									window.location.href = data?.link;
								}

								// Update local state to 'success'
								setCurrentPaymentStatus('success');
							} else if (successfulPayment.email_sent) {
								setCurrentPaymentStatus('success');
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

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
			</div>
		);
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
