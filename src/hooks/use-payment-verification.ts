import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';
import { 
  checkExistingSuccessfulPayment, 
  createOrUpdatePendingPayment,
} from '@/utils/paymentUtils';

export type PaymentStatus = 'pending' | 'success' | 'failed';

interface UsePaymentVerificationProps {
  email: string;
  amount: number;
  enabled: boolean;
}

export function usePaymentVerification({ email, amount, enabled }: UsePaymentVerificationProps) {
  const [transactionStatus, setTransactionStatus] = useState<PaymentStatus>('pending');

  useEffect(() => {
    if (!enabled) return;

    const verifyPayment = async (paymentId: string) => {
      if (!paymentId) return false;

      try {
        console.log('Verifying payment status for ID:', paymentId);
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { 
            email,
            amount: Number(amount.toFixed(3)),
            paymentId
          }
        });

        if (error) {
          console.error('Error verifying payment:', error);
          return false;
        }

        console.log('Payment verification response:', data);

        if (data.status === 'success') {
          setTransactionStatus('success');
          toast.success("Payment confirmed!");
          
          // Call the check-and-send-emails function with proper error handling
          try {
            console.log('Triggering email check after successful payment');
            const { data: emailData, error: emailError } = await supabase.functions.invoke('check-and-send-emails');
            
            if (emailError) {
              console.error('Error triggering email check:', emailError);
              toast.error('Failed to send confirmation email');
            } else {
              console.log('Email check response:', emailData);
              if (emailData?.results?.some((result: any) => result.success)) {
                toast.success('Confirmation email sent!');
              }
            }
          } catch (emailError) {
            console.error('Error in email sending process:', emailError);
            toast.error('Failed to process confirmation email');
          }
          
          return true;
        } else if (data.status === 'no_payment_found') {
          setTransactionStatus('failed');
          return true;
        }

      } catch (error) {
        console.error('Error checking payment:', error);
      }
      return false;
    };

    const initializePaymentCheck = async () => {
      // First check for existing successful payment
      const successfulPayment = await checkExistingSuccessfulPayment(email);
      if (successfulPayment) {
        setTransactionStatus('success');
        return null;
      }

      // If no successful payment, create or update pending payment
      const payment = await createOrUpdatePendingPayment(email, amount);
      return payment?.id;
    };

    let intervalId: number;
    initializePaymentCheck().then(paymentId => {
      if (paymentId) {
        // Initial verification
        verifyPayment(paymentId);
        
        // Set up polling every 30 seconds
        intervalId = window.setInterval(() => {
          verifyPayment(paymentId);
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
    transactionStatus
  };
}