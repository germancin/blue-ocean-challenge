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

    const getOrCreatePayment = async () => {
      try {
        // Format amount to exactly 3 decimal places
        const formattedAmount = Number(amount.toFixed(3));
        console.log('Formatted amount:', formattedAmount);

        // Check for any existing payment for this email
        const { data: existingPayment, error: existingError } = await supabase
          .from('payments')
          .select('*')
          .eq('email', email)
          .maybeSingle();

        if (existingError) {
          console.error('Error checking existing payment:', existingError);
          toast.error("Error checking payment status");
          return null;
        }

        console.log('Existing payment check result:', existingPayment);

        if (existingPayment) {
          console.log('Found existing payment:', existingPayment);
          
          // Update the existing payment with new amount if status is pending
          if (existingPayment.status === 'pending') {
            console.log('Attempting to update payment amount to:', formattedAmount);
            
            const { data: updatedPayment, error: updateError } = await supabase
              .from('payments')
              .update({ 
                amount: formattedAmount,
                updated_at: new Date().toISOString()
              })
              .eq('email', email)
              .select()
              .maybeSingle();

            if (updateError) {
              console.error('Error updating payment:', updateError);
              toast.error("Error updating payment record");
              return null;
            }

            console.log('Updated payment result:', updatedPayment);
            return existingPayment.id;
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

    const sendConfirmationEmail = async (paymentId: string) => {
      try {
        // Check if email was already sent
        const { data: payment } = await supabase
          .from('payments')
          .select('email_sent')
          .eq('id', paymentId)
          .single();

        if (payment?.email_sent) {
          console.log('Email was already sent for this payment');
          return;
        }

        console.log('Sending confirmation email to:', email);
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

        // Mark email as sent
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

    const checkPayment = async (paymentId: string) => {
      if (!paymentId) return false;

      try {
        console.log('Checking payment status for ID:', paymentId);
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { 
            email,
            amount: Number(amount.toFixed(3)),
            paymentId
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
          // Send confirmation email when payment is successful
          await sendConfirmationEmail(paymentId);
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
    transactionStatus
  };
}