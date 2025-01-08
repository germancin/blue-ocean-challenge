import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';

export const checkExistingSuccessfulPayment = async (email: string) => {
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
    return existingSuccessfulPayment;
  }

  return null;
};

export const createOrUpdatePendingPayment = async (email: string, amount: number) => {
  const formattedAmount = Number(amount.toFixed(3));
  
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

    return existingPayment;
  }

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

  return newPayment;
};

export const sendPaymentConfirmationEmail = async (email: string, amount: number, paymentId: string) => {
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