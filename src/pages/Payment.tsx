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
  const [currentPaymentId, setCurrentPaymentId] = useState<string | null>(null);

  useEffect(() => {
    const checkExistingPayment = async () => {
      if (!email) {
        navigate('/');
        return;
      }

      try {
        // First check if there's ANY existing payment for this email
        const { data: existingPayment, error: existingError } = await supabase
          .from('payments')
          .select('id, status, amount, email_sent')
          .eq('email', email)
          .maybeSingle();

        if (existingError) {
          console.error('Error checking existing payment:', existingError);
          toast.error('Error checking payment status');
          return;
        }

        if (existingPayment) {
          console.log('Found existing payment:', existingPayment);
          setCurrentPaymentId(existingPayment.id);

          if (existingPayment.status === 'success') {
            setInitialPaymentStatus('success');
            setUniqueAmount(existingPayment.amount);
            toast.success('Payment already completed!');

            if (!existingPayment.email_sent) {
              try {
                const { error: emailError } = await supabase.functions.invoke('check-and-send-emails', {
                  body: { 
                    email,
                    paymentId: existingPayment.id
                  }
                });
                
                if (emailError) {
                  console.error('Error triggering email check:', emailError);
                  toast.error('Failed to send confirmation email');
                }
              } catch (emailError) {
                console.error('Error in email sending process:', emailError);
                toast.error('Failed to process confirmation email');
              }
            }
            return;
          }

          // If payment exists but is pending, update its amount
          const newAmount = await generateUniqueAmount(BASE_AMOUNT);
          const { error: updateError } = await supabase
            .from('payments')
            .update({ amount: newAmount })
            .eq('id', existingPayment.id);

          if (updateError) {
            console.error('Error updating payment amount:', updateError);
            toast.error('Error updating payment amount');
            return;
          }

          setUniqueAmount(newAmount);
          setIsInitialized(true);
          return;
        }

        // Only create new payment if no payment exists at all
        const newAmount = await generateUniqueAmount(BASE_AMOUNT);
        const { data: newPayment, error: createError } = await supabase
          .from('payments')
          .insert([{ 
            email, 
            amount: newAmount,
            status: 'pending',
            email_sent: false
          }])
          .select()
          .single();

        if (createError) {
          console.error('Error creating payment:', createError);
          toast.error('Error creating payment');
          return;
        }

        setCurrentPaymentId(newPayment.id);
        setUniqueAmount(newAmount);
        setIsInitialized(true);

      } catch (error) {
        console.error('Error initializing payment:', error);
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

  useEffect(() => {
    // Only trigger email check when transaction status changes to success and we have a payment ID
    if (transactionStatus === 'success' && currentPaymentId) {
      const sendEmail = async () => {
        try {
          const { error: emailError } = await supabase.functions.invoke('check-and-send-emails', {
            body: { 
              email,
              paymentId: currentPaymentId
            }
          });
          if (emailError) {
            console.error('Error triggering email check:', emailError);
            toast.error('Failed to send confirmation email');
          }
        } catch (error) {
          console.error('Error in email sending process:', error);
          toast.error('Failed to process confirmation email');
        }
      };
      sendEmail();
    }
  }, [transactionStatus, currentPaymentId, email]);

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
