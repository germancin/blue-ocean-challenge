import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PaymentDetailsCard } from '@/components/payment/PaymentDetailsCard';
import { PaymentInstructionsCard } from '@/components/payment/PaymentInstructionsCard';
import { PaymentInformationCard } from '@/components/payment/PaymentInformationCard';
import { usePaymentVerification } from '@/hooks/use-payment-verification';
import { generateUniqueAmount } from '@/utils/paymentUtils';
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
  const [initialPaymentStatus, setInitialPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');

  useEffect(() => {
    const checkExistingPayment = async () => {
      if (!email) {
        navigate('/');
        return;
      }

      try {
        // First check if there's a successful payment
        const { data: payment, error } = await supabase
          .from('payments')
          .select('status')
          .eq('email', email)
          .eq('status', 'success')
          .maybeSingle();

        if (error) {
          console.error('Error checking payment:', error);
          return;
        }

        if (payment) {
          console.log('Found successful payment:', payment);
          setInitialPaymentStatus('success');
          toast.success('Payment already completed!');
        }

        // If no successful payment or if checking for pending payment
        const { data: existingPayment, error: fetchError } = await supabase
          .from('payments')
          .select('id, amount')
          .eq('email', email)
          .eq('status', 'pending')
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching existing payment:', fetchError);
          toast.error('Error retrieving payment information');
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
            return;
          }
        }

        setUniqueAmount(newAmount);
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing payment amount:', error);
        toast.error('Error generating payment amount');
      }
    };

    checkExistingPayment();
  }, [email, navigate]);

  const { transactionStatus } = usePaymentVerification({
    email: email || '',
    amount: uniqueAmount || 0,
    enabled: isInitialized && !!email && !!uniqueAmount && termsAccepted && initialPaymentStatus !== 'success'
  });

  const handleTermsAcceptance = (accepted: boolean) => {
    setTermsAccepted(accepted);
    if (accepted) {
      toast.success("Terms and conditions accepted");
    }
  };

  // Use initialPaymentStatus if it's success, otherwise use the transactionStatus from verification
  const displayStatus = initialPaymentStatus === 'success' ? 'success' : transactionStatus;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <PaymentInformationCard onAcceptTerms={handleTermsAcceptance} />
        </div>

        <div className="lg:col-span-1">
          <PaymentDetailsCard 
            amount={uniqueAmount || 0}
            email={email || ''}
          />
        </div>

        <div className="lg:col-span-1">
          <PaymentInstructionsCard 
            amount={uniqueAmount || 0}
            merchantAddress={MERCHANT_ADDRESS}
            transactionStatus={displayStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;