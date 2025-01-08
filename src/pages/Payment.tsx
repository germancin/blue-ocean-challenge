import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PaymentDetailsCard } from '@/components/payment/PaymentDetailsCard';
import { PaymentInstructionsCard } from '@/components/payment/PaymentInstructionsCard';
import { PaymentInformationCard } from '@/components/payment/PaymentInformationCard';
import { usePaymentVerification } from '@/hooks/use-payment-verification';
import { generateUniqueAmount, checkPaymentStatus } from '@/utils/paymentUtils';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const BASE_AMOUNT = 2;
const MERCHANT_ADDRESS = 'TWM4e9QrTVUiZ67mrnC6EkaELvyQCwHb1t';

interface LocationState {
  email?: string;
}

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = (location.state as LocationState) || {};
  const [uniqueAmount, setUniqueAmount] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { transactionStatus } = usePaymentVerification({
    email: email || '',
    amount: uniqueAmount || 0,
    enabled: isInitialized && !!email && !!uniqueAmount && termsAccepted
  });

  useEffect(() => {
    const checkExistingPayment = async () => {
      if (!email) {
        navigate('/');
        return;
      }

      const paymentStatus = await checkPaymentStatus(email);
      if (paymentStatus === 'success') {
        toast.error('You are already subscribed and your payment is completed');
        navigate('/');
        return;
      }

      try {
        const { data: existingPayment, error: fetchError } = await supabase
          .from('payments')
          .select('id, amount')
          .eq('email', email)
          .eq('status', 'pending')
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching existing payment:', fetchError);
          toast.error('Error retrieving payment information');
          navigate('/');
          return;
        }

        const newAmount = await generateUniqueAmount(BASE_AMOUNT);
        console.log('Generated new unique amount:', newAmount);

        if (existingPayment) {
          console.log('Found existing payment, updating amount:', existingPayment.id);
          const { error: updateError } = await supabase
            .from('payments')
            .update({ amount: newAmount })
            .eq('id', existingPayment.id);

          if (updateError) {
            console.error('Error updating payment amount:', updateError);
            toast.error('Error updating payment amount');
            navigate('/');
            return;
          }
        }

        setUniqueAmount(newAmount);
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing payment amount:', error);
        toast.error('Error generating payment amount');
        navigate('/');
      }
    };

    checkExistingPayment();
  }, [email, navigate]);

  const handleTermsAcceptance = (accepted: boolean) => {
    setTermsAccepted(accepted);
    if (accepted) {
      toast.success("Terms and conditions accepted");
    }
  };

  if (!email || !uniqueAmount) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <PaymentInformationCard onAcceptTerms={handleTermsAccepted} />
        </div>

        <div className="lg:col-span-1">
          <PaymentDetailsCard 
            amount={uniqueAmount}
            email={email}
          />
        </div>

        <div className="lg:col-span-1">
          <PaymentInstructionsCard 
            amount={uniqueAmount}
            merchantAddress={MERCHANT_ADDRESS}
            transactionStatus={transactionStatus}
          />
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;