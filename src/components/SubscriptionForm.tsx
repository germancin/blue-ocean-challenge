import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { SubscriptionFields } from "./subscription/SubscriptionFields";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

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

      // First check if email already exists in subscribers
      const { data: existingSubscriber } = await supabase
        .from('subscribers')
        .select('*')
        .eq('email', data.email)
        .maybeSingle();

      if (!existingSubscriber) {
        // If subscriber doesn't exist, insert new record
        const { error: insertError } = await supabase
          .from('subscribers')
          .insert([
            {
              name: data.name,
              email: data.email,
            },
          ]);

        if (insertError) {
          throw insertError;
        }
      }

      // Check for existing payments
      const { data: existingPayment } = await supabase
        .from('payments')
        .select('*')
        .eq('email', data.email)
        .eq('status', 'success')
        .maybeSingle();

      if (existingPayment) {
        toast({
          title: "Payment already completed",
          description: "You have already completed the payment process.",
        });
        navigate("/chart");
        return;
      }

      // Proceed to payment page
      onSuccess?.();
      navigate("/payment", { 
        state: { 
          email: data.email,
          name: data.name
        } 
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SubscriptionFields register={register} errors={errors} />
      <Button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Register"}
      </Button>
    </form>
  );
}