import { useState, useRef, useEffect } from 'react';
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
  const currentPaymentIdRef = useRef<string>('');

  useEffect(() => {
    // Create initial payment record with a unique payment ID
    const createPayment = async () => {
      // Generate a unique payment ID that includes a timestamp and random string
      const timestamp = Date.now();
      const random = Math.random().toString(36).substr(2, 9);
      const uniqueId = `PAY-${timestamp}-${random}`;
      
      // Store the payment ID in the ref for safe comparison during polling
      currentPaymentIdRef.current = uniqueId;

      const { error } = await supabase
        .from('payments')
        .insert([
          { 
            email, 
            amount,
            payment_id: uniqueId 
          }
        ]);

      if (error) {
        console.error('Error creating payment:', error);
        setTransactionStatus('failed');
        toast.error("Error creating payment record");
      } else {
        setPaymentId(uniqueId);
      }
    };

    createPayment();

    // Set up polling to check for payment
    const checkPayment = async () => {
      // Ensure we're checking for the current payment session
      const currentId = currentPaymentIdRef.current;
      if (!currentId || currentId !== paymentId) return false;

      try {
        console.log('Checking payment status for payment ID:', currentId);
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { 
            email, 
            paymentId: currentId 
          }
        });

        if (error) {
          console.error('Error checking payment:', error);
          toast.error("Error verifying payment");
          return false;
        }

        // Verify we're still on the same payment session
        if (currentId !== currentPaymentIdRef.current) {
          console.log('Payment session changed, ignoring response');
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

    // Check every 30 seconds
    const intervalId = setInterval(async () => {
      const shouldStop = await checkPayment();
      if (shouldStop) {
        clearInterval(intervalId);
      }
    }, 30000);
    
    // Initial check
    checkPayment();

    return () => {
      clearInterval(intervalId);
      // Clear the current payment ID when component unmounts
      currentPaymentIdRef.current = '';
    };
  }, [email, amount, paymentId]);

  return {
    transactionStatus,
    paymentId
  };
}