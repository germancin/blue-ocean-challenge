import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { PostgrestError } from "@supabase/supabase-js";

interface SubscriptionFormData {
  name: string;
  email: string;
}

export function SubscriptionForm({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError } = useForm<SubscriptionFormData>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const checkPaymentStatus = async (email: string) => {
    const { data: payments } = await supabase
      .from('payments')
      .select('status')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1);

    return payments && payments.length > 0 ? payments[0].status : null;
  };

  const saveToSupabase = async (data: SubscriptionFormData) => {
    const { error } = await supabase
      .from('subscribers')
      .insert([
        {
          name: data.name,
          email: data.email,
          language: i18n.language,
        },
      ]);

    if (error) throw error;
  };

  const onSubmit = async (data: SubscriptionFormData) => {
    setIsLoading(true);
    try {
      await saveToSupabase(data);
      toast.success("Successfully saved your information!");
      onSuccess();
      // Redirect to payment page with email
      navigate('/payment', { state: { email: data.email } });
    } catch (error) {
      console.error('Submission error:', error);
      if ((error as PostgrestError).code === '23505') {
        // Check payment status for existing subscriber
        const paymentStatus = await checkPaymentStatus(data.email);
        
        if (!paymentStatus) {
          // No payment found, redirect to payment page
          toast.info("You're already subscribed. Redirecting to complete payment.");
          navigate('/payment', { state: { email: data.email } });
        } else if (paymentStatus === 'completed') {
          // Payment completed
          setError('email', {
            type: 'manual',
            message: 'You are already subscribed and your payment is completed'
          });
          toast.error("You are already subscribed and your payment is completed");
        } else {
          // Payment pending or other status
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
      <div className="space-y-2">
        <Label htmlFor="name" className="text-lg font-medium text-white">
          Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-lg font-medium text-white">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium text-lg py-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
      >
        {isLoading ? "Processing..." : "Start Your Trading Journey Now 🚀"}
      </Button>
    </form>
  );
}