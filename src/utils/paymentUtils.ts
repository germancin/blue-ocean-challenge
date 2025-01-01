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