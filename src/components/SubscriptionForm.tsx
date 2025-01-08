import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { PostgrestError } from "@supabase/supabase-js";
import { SubscriptionFields } from "./subscription/SubscriptionFields";
import { SubscriptionButton } from "./subscription/SubscriptionButton";
import { checkPaymentStatus, saveSubscriber } from "@/utils/paymentUtils";

interface SubscriptionFormData {
  name: string;
  email: string;
  acceptTerms: boolean;
}

export function SubscriptionForm({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError } = useForm<SubscriptionFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: SubscriptionFormData) => {
    if (!data.acceptTerms) {
      setError('acceptTerms', {
        type: 'manual',
        message: 'You must accept the terms and conditions'
      });
      return;
    }

    setIsLoading(true);
    try {
      await saveSubscriber(data.name, data.email);
      toast.success("Successfully saved your information!");
      onSuccess();
      navigate('/payment', { state: { email: data.email } });
    } catch (error) {
      console.error('Submission error:', error);
      if ((error as PostgrestError).code === '23505') {
        const paymentStatus = await checkPaymentStatus(data.email);
        
        if (!paymentStatus) {
          toast.info("You're already subscribed. Redirecting to complete payment.");
          navigate('/payment', { state: { email: data.email } });
        } else if (paymentStatus === 'completed') {
          setError('email', {
            type: 'manual',
            message: 'You are already subscribed and your payment is completed'
          });
          toast.error("You are already subscribed and your payment is completed");
        } else {
          toast.info("You're already subscribed. Redirecting to payment page.");
          navigate('/payment', { state: { email: data.email } });
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SubscriptionFields register={register} errors={errors} />
      <SubscriptionButton isLoading={isLoading} />
    </form>
  );
}