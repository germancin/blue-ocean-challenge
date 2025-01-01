import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';

export type PaymentStatus = 'pending' | 'success' | 'failed';

interface UsePaymentVerificationProps {
  email: string;
  amount: number;
}

export function usePaymentVerification({ email, amount }: UsePaymentVerificationProps) {
  const [transactionStatus, setTransactionStatus] = useState<PaymentStatus>('pending');
  const [paymentId, setPaymentId] = useState<string>('');

  useEffect(() => {
    // First try to find an existing pending payment for this email
    const getOrCreatePayment = async () => {
      try {
        // Check for existing pending payment
        const { data: existingPayment } = await supabase
          .from('payments')
          .select('payment_id, status')
          .eq('email', email)
          .eq('status', 'pending')
          .single();

        if (existingPayment) {
          console.log('Found existing payment:', existingPayment);
          setPaymentId(existingPayment.payment_id);
          return existingPayment.payment_id;
        }

        // If no pending payment exists, create a new one
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        const uniqueId = `PAY-${timestamp}-${random}`;

        const { error: insertError } = await supabase
          .from('payments')
          .insert([{ 
            email, 
            amount,
            payment_id: uniqueId,
            status: 'pending'
          }]);

        if (insertError) {
          console.error('Error creating payment:', insertError);
          toast.error("Error creating payment record");
          return null;
        }

        setPaymentId(uniqueId);
        return uniqueId;
      } catch (error) {
        console.error('Error in getOrCreatePayment:', error);
        toast.error("Error setting up payment");
        return null;
      }
    };

    // Set up polling to check for payment
    const checkPayment = async (currentPaymentId: string) => {
      if (!currentPaymentId) return false;

      try {
        console.log('Checking payment status for payment ID:', currentPaymentId);
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { 
            email, 
            paymentId: currentPaymentId 
          }
        });

        if (error) {
          console.error('Error checking payment:', error);
          toast.error("Error verifying payment");
          return false;
        }

        console.log('Payment verification response:', data);

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
  }, [email, amount]);

  return {
    transactionStatus,
    paymentId
  };
}