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

  useEffect(() => {
    if (!enabled) return;

    const checkExistingPayment = async () => {
      try {
        // First check if there's already a successful payment for this email
        const { data: existingSuccessfulPayment, error: existingError } = await supabase
          .from('payments')
          .select('*')
          .eq('email', email)
          .eq('status', 'success')
          .maybeSingle();

        if (existingError) {
          console.error('Error checking existing payment:', existingError);
          toast.error("Error checking payment status");
          return null;
        }

        if (existingSuccessfulPayment) {
          console.log('Found existing successful payment:', existingSuccessfulPayment);
          setTransactionStatus('success');
          return existingSuccessfulPayment.id;
        }

        // Format amount to exactly 3 decimal places
        const formattedAmount = Number(amount.toFixed(3));
        console.log('Formatted amount:', formattedAmount);

        // Check for any pending payment
        const { data: existingPayment, error: pendingError } = await supabase
          .from('payments')
          .select('*')
          .eq('email', email)
          .eq('status', 'pending')
          .maybeSingle();

        if (pendingError) {
          console.error('Error checking pending payment:', pendingError);
          return null;
        }

        if (existingPayment) {
          console.log('Found existing pending payment:', existingPayment);
          
          const { data: updatedPayment, error: updateError } = await supabase
            .from('payments')
            .update({ 
              amount: formattedAmount,
              updated_at: new Date().toISOString()
            })
            .eq('id', existingPayment.id)
            .select()
            .maybeSingle();

          if (updateError) {
            console.error('Error updating payment:', updateError);
            return null;
          }

          return existingPayment.id;
        }

        // If no payment exists, create a new one
        const { data: newPayment, error: insertError } = await supabase
          .from('payments')
          .insert([{ 
            email, 
            amount: formattedAmount,
            status: 'pending',
            email_sent: false
          }])
          .select()
          .maybeSingle();

        if (insertError || !newPayment) {
          console.error('Error creating payment:', insertError);
          return null;
        }

        console.log('Created new payment:', newPayment);
        return newPayment.id;
      } catch (error) {
        console.error('Error in checkExistingPayment:', error);
        return null;
      }
    };

    const sendConfirmationEmail = async (paymentId: string) => {
      try {
        const { data: payment } = await supabase
          .from('payments')
          .select('email_sent')
          .eq('id', paymentId)
          .single();

        if (payment?.email_sent) {
          console.log('Email was already sent for this payment');
          return;
        }

        const { error: emailError } = await supabase.functions.invoke('send-confirmation-email', {
          body: { 
            email, 
            amount: Number(amount.toFixed(3))
          }
        });

        if (emailError) {
          console.error('Error sending confirmation email:', emailError);
          return;
        }

        const { error: updateError } = await supabase
          .from('payments')
          .update({ email_sent: true })
          .eq('id', paymentId);

        if (updateError) {
          console.error('Error updating email_sent status:', updateError);
          return;
        }

        console.log('Confirmation email sent successfully and status updated');
        toast.success("Confirmation email sent!");
      } catch (error) {
        console.error('Error in sendConfirmationEmail:', error);
      }
    };

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
          await sendConfirmationEmail(paymentId);
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

    let intervalId: number;
    checkExistingPayment().then(paymentId => {
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