import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const usePaymentVerification = (email: string) => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | null>(null);

  useEffect(() => {
    const checkPayment = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}/verify-payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            email,
            amount: 99.99,
            paymentId: localStorage.getItem('paymentId'),
          }),
        });

        const data = await response.json();
        
        if (data.status === 'success') {
          setPaymentStatus('success');
          setIsVerifying(false);
          toast.success('Payment verified successfully!');
          
          // Update payment status in Supabase
          const { error } = await supabase
            .from('payments')
            .update({ status: 'success' })
            .eq('email', email);
            
          if (error) {
            console.error('Error updating payment status:', error);
          }
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
      }
    };

    const interval = setInterval(checkPayment, 30000); // Check every 30 seconds
    checkPayment(); // Initial check

    return () => clearInterval(interval);
  }, [email]);

  return { isVerifying, paymentStatus };
};