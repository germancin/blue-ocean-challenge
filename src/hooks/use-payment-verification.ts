import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { generateUniqueAmount } from '@/utils/paymentUtils';
import { BASE_PAYMENT_AMOUNT } from '@/constants/payments';

export type PaymentStatus = 'pending' | 'success' | 'failed' | null;

export const usePaymentVerification = (email: string) => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(null);
  const [paymentAmount, setPaymentAmount] = useState<number | null>(null);

  useEffect(() => {
    const initializePayment = async () => {
      try {
        // First check if there's an existing pending payment
        const { data: existingPayment, error: fetchError } = await supabase
          .from('payments')
          .select('*')
          .eq('email', email)
          .eq('status', 'pending')
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching payment:', fetchError);
          throw fetchError;
        }

        if (existingPayment) {
          console.log('Found existing pending payment:', existingPayment);
          setPaymentAmount(existingPayment.amount);
          setPaymentStatus('pending');
          setIsVerifying(false);
          return;
        }

        // If no pending payment exists, generate a new unique amount
        const uniqueAmount = await generateUniqueAmount(BASE_PAYMENT_AMOUNT);
        console.log('Generated new unique amount:', uniqueAmount);

        // Create new payment record
        const { error: insertError } = await supabase
          .from('payments')
          .insert([
            {
              email,
              amount: uniqueAmount,
              status: 'pending',
              email_sent: false
            }
          ]);

        if (insertError) {
          console.error('Error creating payment:', insertError);
          throw insertError;
        }

        setPaymentAmount(uniqueAmount);
        setPaymentStatus('pending');
      } catch (error) {
        console.error('Error in initializePayment:', error);
        setPaymentStatus('failed');
        toast.error('Failed to initialize payment');
      } finally {
        setIsVerifying(false);
      }
    };

    const checkPayment = async () => {
      try {
        const { data: payment, error: fetchError } = await supabase
          .from('payments')
          .select('*')
          .eq('email', email)
          .eq('status', 'pending')
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching payment:', fetchError);
          return;
        }

        if (!payment) {
          // Check if there's a successful payment
          const { data: successfulPayment } = await supabase
            .from('payments')
            .select('*')
            .eq('email', email)
            .eq('status', 'success')
            .maybeSingle();

          if (successfulPayment) {
            setPaymentStatus('success');
            if (!successfulPayment.email_sent) {
              // Send confirmation email using the edge function
              const { error: functionError } = await supabase.functions.invoke('check-and-send-emails', {
                body: {
                  email,
                  paymentId: successfulPayment.id,
                  amount: successfulPayment.amount
                }
              });

              if (functionError) {
                console.error('Failed to send email:', functionError);
              }
            }
          }
          return;
        }

        setPaymentAmount(payment.amount);

        // Use Supabase Functions client to call the verify-payment function
        const { data, error: functionError } = await supabase.functions.invoke('verify-payment', {
          body: {
            email,
            amount: payment.amount,
            paymentId: payment.id,
          }
        });

        if (functionError) {
          console.error('Error verifying payment:', functionError);
          return;
        }
        
        if (data?.status === 'success') {
          setPaymentStatus('success');
          toast.success('Payment verified successfully!');
        } else {
          setPaymentStatus(data?.status || 'pending');
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setPaymentStatus('failed');
      }
    };

    initializePayment();
    const interval = setInterval(checkPayment, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [email]);

  return { isVerifying, paymentStatus, paymentAmount };
};