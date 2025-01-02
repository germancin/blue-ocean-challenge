import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';

export type PaymentStatus = 'pending' | 'success' | 'failed';

interface UsePaymentVerificationProps {
  email: string;
  amount: number;
  enabled: boolean;
}

export function usePaymentVerification({ email, amount, enabled }: UsePaymentVerificationProps) {
  const [transactionStatus, setTransactionStatus] = useState<PaymentStatus>('pending');
  const [blocksConfirmed, setBlocksConfirmed] = useState<number>(0);

  useEffect(() => {
    if (!enabled) return;

    // First try to find an existing pending payment for this email and amount
    const getOrCreatePayment = async () => {
      try {
        // Check for existing pending payment
        const { data: existingPayment, error: existingError } = await supabase
          .from('payments')
          .select('id, status')
          .eq('email', email)
          .eq('amount', amount)
          .eq('status', 'pending')
          .maybeSingle();

        if (existingError) {
          console.error('Error checking existing payment:', existingError);
          toast.error("Error checking payment status");
          return null;
        }

        if (existingPayment) {
          console.log('Found existing payment:', existingPayment);
          return existingPayment.id;
        }

        // If no pending payment exists, create a new one
        const { data: newPayment, error: insertError } = await supabase
          .from('payments')
          .insert([{ 
            email, 
            amount,
            status: 'pending'
          }])
          .select()
          .single();

        if (insertError) {
          console.error('Error creating payment:', insertError);
          toast.error("Error creating payment record");
          return null;
        }

        console.log('Created new payment:', newPayment);
        return newPayment.id;
      } catch (error) {
        console.error('Error in getOrCreatePayment:', error);
        toast.error("Error setting up payment");
        return null;
      }
    };

    // Set up polling to check for payment
    const checkPayment = async (paymentId: string) => {
      if (!paymentId) return false;

      try {
        console.log('Checking payment status for ID:', paymentId);
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { 
            email,
            amount,
            paymentId
          }
        });

        if (error) {
          console.error('Error checking payment:', error);
          toast.error("Error verifying payment");
          return false;
        }

        console.log('Payment verification response:', data);

        // Update blocks confirmed if available
        if (data.blocksConfirmed !== undefined) {
          setBlocksConfirmed(data.blocksConfirmed);
        }

        if (data.status === 'success') {
          setTransactionStatus('success');
          toast.success("Payment confirmed!");
          return true;
        } else if (data.status === 'no_payment_found') {
          setTransactionStatus('failed');
          toast.error("Payment record not found");
          return true;
        }

      } catch (error) {
        console.error('Error checking payment:', error);
        toast.error("Error checking payment status");
      }
      return false;
    };

    // Initialize payment and start polling
    let intervalId: number;
    getOrCreatePayment().then(paymentId => {
      if (paymentId) {
        // Initial check
        checkPayment(paymentId);
        
        // Set up polling every 30 seconds
        intervalId = window.setInterval(() => {
          checkPayment(paymentId);
        }, 30000);
      }
    });

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [email, amount, enabled]);

  return {
    transactionStatus,
    blocksConfirmed
  };
}