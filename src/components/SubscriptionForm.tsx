import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { SubscriptionFields } from './subscription/SubscriptionFields';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { generateUniqueAmount, createOrUpdatePendingPayment } from '@/utils/paymentUtils';
import { BASE_PAYMENT_AMOUNT } from '@/constants/payments';
import { triggerWebhook } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const subscriptionWebhook = 'https://n8n.elitetraderhub.co/webhook/subscription-email';
// const subscriptionWebhook = 'https://n8n.elitetraderhub.co/webhook-test/subscription-email';

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
	const { t, i18n } = useTranslation();
	const selectedLocation = i18n.language;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SubscriptionFormData>();

	const onSubmit = async (data: SubscriptionFormData) => {
		try {
			setIsLoading(true);

			// Check if the email already exists in subscribers
			const { data: existingSubscriber, error: subscriberError } = await supabase.from('subscribers').select('*').eq('email', data.email).maybeSingle();

			if (subscriberError) throw subscriberError;

			// Create new subscriber if it doesn't exist
			if (!existingSubscriber) {
				const { error: insertError } = await supabase.from('subscribers').insert([
					{
						name: data.name,
						email: data.email,
						i18n: selectedLocation,
					},
				]);
				if (insertError) throw insertError;
			}

			// Check for existing payment
			const { data: existingPayment, error: paymentError } = await supabase.from('payments').select('*').eq('email', data.email).maybeSingle();

			if (paymentError) throw paymentError;

			if (existingPayment?.email_sent && existingPayment?.status === 'success') {
				toast({
					title: t('subscriptionForm.successToastTitle'),
					description: t('subscriptionForm.successToastDescription'),
				});
				return;
			}

			if (!existingPayment?.email_sent && existingPayment?.status === 'success') {
				toast({
					title: t('subscriptionForm.welcomeEmailToastTitle'),
					description: t('subscriptionForm.welcomeEmailToastDescription'),
				});

				const { data: emailResponse, error: emailError } = await supabase.functions.invoke('check-and-send-emails', {
					body: {
						email: existingPayment.email,
						paymentId: existingPayment.id,
						amount: existingPayment.amount,
					},
				});

				if (emailResponse?.success) {
					toast({
						title: t('subscriptionForm.confirmationEmailSuccessTitle'),
						description: t('subscriptionForm.confirmationEmailSuccessDescription'),
					});
				} else {
					toast({
						variant: 'destructive',
						title: t('subscriptionForm.confirmationEmailErrorTitle'),
						description: t('subscriptionForm.confirmationEmailErrorDescription'),
					});
				}

				navigate('/payment', {
					state: {
						email: data.email,
						name: data.name,
						paymentStatus: existingPayment.status,
						paymentAmount: existingPayment.amount,
					},
				});
				return;
			}

			if (!existingPayment?.email_sent && existingPayment?.status === 'pending') {
				navigate('/payment', {
					state: {
						email: data.email,
						name: data.name,
						paymentStatus: existingPayment.status,
						paymentAmount: existingPayment.amount,
					},
				});
				return;
			}

			// Generate unique payment amount
			const uniqueAmount = await generateUniqueAmount(BASE_PAYMENT_AMOUNT);

			// Create new pending payment
			const payment = await createOrUpdatePendingPayment(data.email, uniqueAmount);
			if (!payment) throw new Error(t('subscriptionForm.paymentCreationError'));

			// Proceed to payment page
			const stateObj = {
				email: data.email,
				name: data.name,
				paymentStatus: 'pending',
				paymentAmount: payment.amount,
				i18n: selectedLocation,
			};

			triggerWebhook(subscriptionWebhook, stateObj);
			onSuccess?.();
			navigate('/payment', { state: stateObj });
		} catch (error) {
			toast({
				variant: 'destructive',
				title: t('subscriptionForm.errorToastTitle'),
				description: t('subscriptionForm.errorToastDescription'),
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<SubscriptionFields register={register} errors={errors} />
			<Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
				{isLoading ? t('subscriptionForm.processing') : t('subscriptionForm.register')}
			</Button>
		</form>
	);
}
