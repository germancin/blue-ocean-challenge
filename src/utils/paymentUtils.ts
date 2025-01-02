import { supabase } from "@/integrations/supabase/client";

export const checkPaymentStatus = async (email: string) => {
  const { data: payments } = await supabase
    .from('payments')
    .select('status')
    .eq('email', email)
    .order('created_at', { ascending: false })
    .limit(1);

  return payments && payments.length > 0 ? payments[0].status : null;
};

export const saveSubscriber = async (name: string, email: string, language: string) => {
  const { error } = await supabase
    .from('subscribers')
    .insert([{ name, email, language }]);

  if (error) throw error;
};

export const generateUniqueAmount = async (baseAmount: number): Promise<number> => {
  const maxAttempts = 10;
  let attempts = 0;

  while (attempts < maxAttempts) {
    // Generate a random 3-digit decimal
    const randomDecimals = Math.floor(Math.random() * 1000);
    // Format to exactly 3 decimal places
    const uniqueAmount = Number(`${Math.floor(baseAmount)}.${randomDecimals.toString().padStart(3, '0')}`);
    
    // Check if this amount is already in use in pending payments
    const { data: existingPayment } = await supabase
      .from('payments')
      .select('id')
      .eq('amount', uniqueAmount)
      .eq('status', 'pending')
      .single();

    if (!existingPayment) {
      return uniqueAmount;
    }

    attempts++;
  }

  throw new Error('Could not generate unique amount after maximum attempts');
};