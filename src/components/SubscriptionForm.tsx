import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";

interface SubscriptionFormData {
  name: string;
  email: string;
}

export function SubscriptionForm({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SubscriptionFormData>();
  const { i18n } = useTranslation();

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

  const createStripeCheckout = async (email: string) => {
    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: { email },
    });

    if (error) throw new Error('Failed to create checkout session');
    if (!data?.url) throw new Error('No checkout URL received');

    window.location.href = data.url;
  };

  const onSubmit = async (data: SubscriptionFormData) => {
    setIsLoading(true);
    try {
      await saveToSupabase(data);
      await createStripeCheckout(data.email);
      toast.success("Successfully saved your information!");
      onSuccess();
    } catch (error) {
      console.error('Submission error:', error);
      toast.error("Something went wrong. Please try again.");
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