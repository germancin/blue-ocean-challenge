import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { SubscriptionFields } from './subscription/SubscriptionFields';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { generateUniqueAmount, createOrUpdatePendingPayment } from '@/utils/paymentUtils';
import { BASE_PAYMENT_AMOUNT } from '@/constants/payments';

interface SubscriptionFormData {
	name: string;
	email: string;
	acceptTerms: boolean;
}

interface SubscriptionFormProps {
	onSuccess?: () => void;
}

export function SubscriptionForm({ onSuccess }: SubscriptionFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SubscriptionFormData>();

	const onSubmit = async (data: SubscriptionFormData) => {
		try {
			setIsLoading(true);
			console.log('Starting subscription process for:', data.email);

			// First check if email already exists in subscribers
			const { data: existingSubscriber, error: subscriberError } = await supabase.from('subscribers').select('*').eq('email', data.email).maybeSingle();

			if (subscriberError) {
				console.error('Error checking subscriber:', subscriberError);
				throw subscriberError;
			}

			// If no subscriber exists, create one
			if (!existingSubscriber) {
				console.log('Creating new subscriber');
				const { error: insertError } = await supabase.from('subscribers').insert([
					{
						name: data.name,
						email: data.email,
					},
				]);

				if (insertError) {
					console.error('Error creating subscriber:', insertError);
					throw insertError;
				}
			}

			// Check for existing successful payment
			const { data: existingPayment, error: paymentError } = await supabase.from('payments').select('*').eq('email', data.email).maybeSingle();

			if (paymentError) {
				console.error('Error checking payment:', paymentError);
				throw paymentError;
			}

			if (existingPayment?.email_sent && existingPayment?.status === 'success') {
				console.log('Found existing successful payment:', existingPayment);
				toast({
					title: 'You are already Registered!',
					description: 'Log in now to join the action!',
				});
				navigate('/chart');
				return;
			}

			if (!existingPayment?.email_sent && existingPayment?.status === 'success') {
				console.log('You need to receive the welcome email:', existingPayment);
				toast({
					title: 'Sending welcome email.',
					description: "You have already paid but didn't received the welcome email. We are sending it right now.",
				});

				// Send confirmation email using the edge function
				const { data, error } = await supabase.functions.invoke('check-and-send-emails', {
					body: {
						email: existingPayment.email_sent,
						paymentId: existingPayment.id,
						amount: existingPayment.amount,
					},
				});

				if (data?.success) {
					console.log('Confirmation email sent successfully');
					toast({
						title: 'Welcome email was sent.',
						description: 'Go to your email to complete your registration.',
					});
				} else if (data?.message) {
					console.log('Email status:', data.message);
				}
				navigate('/payment', {
					state: {
						email: data.email,
						name: data.name,
						paymentStatus: existingPayment?.status,
						paymentAmount: existingPayment?.amount,
					},
				});
				return;
			}

			if (!existingPayment?.email_sent && existingPayment?.status === 'pending') {
				navigate('/payment', {
					state: {
						email: data.email,
						name: data.name,
						paymentStatus: existingPayment?.status,
						paymentAmount: existingPayment?.amount,
					},
				});
				return;
			}

			// Generate unique payment amount
			const uniqueAmount = await generateUniqueAmount(BASE_PAYMENT_AMOUNT);
			console.log('Generated unique amount:', uniqueAmount);

			// Create new pending payment using centralized method
			const payment = await createOrUpdatePendingPayment(data.email, uniqueAmount);

			if (!payment) {
				throw new Error('Failed to create payment record');
			}

			// Proceed to payment page
			console.log('Redirecting to payment page');
			onSuccess?.();
			navigate('/payment', {
				state: {
					email: data.email,
					name: data.name,
					paymentStatus: 'pending',
					paymentAmount: payment.amount,
				},
			});
		} catch (error) {
			console.error('Submission error:', error);
			toast({
				variant: 'destructive',
				title: 'Error',
				description: 'Something went wrong. Please try again.',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<SubscriptionFields register={register} errors={errors} />
			<Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
				{isLoading ? 'Processing...' : 'Register'}
			</Button>
		</form>
	);
}
