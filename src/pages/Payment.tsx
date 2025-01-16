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
        // Check for any existing payment for this email
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

            // Only try to send email if it hasn't been sent yet
            if (!existingPayment.email_sent) {
              try {
                const { error: emailError } = await supabase.functions.invoke('check-and-send-emails', {
                  body: { 
                    email,
                    paymentId: existingPayment.id,
                    amount: existingPayment.amount
                  }
                });
                
                if (emailError) {
                  console.error('Error sending confirmation email:', emailError);
                  toast.error('Failed to send confirmation email');
                }
              } catch (emailError) {
                console.error('Error in email sending process:', emailError);
                toast.error('Failed to process confirmation email');
              }
            }
            return;
          }

          // If payment exists but is pending, use the same amount
          setUniqueAmount(existingPayment.amount);
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
    if (transactionStatus === 'success' && currentPaymentId && email) {
      const sendEmail = async () => {
        try {
          console.log('Attempting to send confirmation email for payment:', currentPaymentId);
          
          // First fetch the payment details to get the amount
          const { data: payment, error: fetchError } = await supabase
            .from('payments')
            .select('amount')
            .eq('id', currentPaymentId)
            .single();

          if (fetchError || !payment) {
            console.error('Error fetching payment details:', fetchError);
            toast.error('Failed to fetch payment details');
            return;
          }

          const { error: emailError } = await supabase.functions.invoke('check-and-send-emails', {
            body: { 
              email,
              paymentId: currentPaymentId,
              amount: payment.amount
            }
          });

          if (emailError) {
            console.error('Error sending confirmation email:', emailError);
            toast.error('Failed to send confirmation email');
          } else {
            console.log('Email sent successfully');
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