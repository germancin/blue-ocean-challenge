import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';
import { 
  checkExistingSuccessfulPayment, 
  createOrUpdatePendingPayment,
  sendPaymentConfirmationEmail
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

    const verifyPayment = async () => {
      try {
        console.log('Verifying payment status for email:', email);
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { 
            email,
            amount: Number(amount.toFixed(3))
          }
        });

        if (error) {
          console.error('Error verifying payment:', error);
          return false;
        }

        console.log('Payment verification response:', data);

        if (data.status === 'success') {
          setTransactionStatus('success');
          // Send confirmation email
          await sendPaymentConfirmationEmail(email, amount);
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
        return;
      }

      // If no successful payment, create or update pending payment
      await createOrUpdatePendingPayment(email, amount);
      
      // Initial verification
      await verifyPayment();
      
      // Set up polling every 30 seconds
      const intervalId = window.setInterval(verifyPayment, 30000);
      
      return () => {
        clearInterval(intervalId);
      };
    };

    initializePaymentCheck();
  }, [email, amount, enabled]);

  return {
    transactionStatus
  };
}