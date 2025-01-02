import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PaymentDetailsCard } from '@/components/payment/PaymentDetailsCard';
import { PaymentInstructionsCard } from '@/components/payment/PaymentInstructionsCard';
import { PaymentInformationCard } from '@/components/payment/PaymentInformationCard';
import { usePaymentVerification } from '@/hooks/use-payment-verification';
import { generateUniqueAmount } from '@/utils/paymentUtils';
import { toast } from 'sonner';

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

  // Initialize verification with default values
  const { transactionStatus, blocksConfirmed } = usePaymentVerification({
    email: email || '',
    amount: uniqueAmount || 0,
    enabled: isInitialized && !!email && !!uniqueAmount
  });

  useEffect(() => {
    const initializeAmount = async () => {
      if (!email) {
        navigate('/');
        return;
      }

      try {
        const amount = await generateUniqueAmount(BASE_AMOUNT);
        setUniqueAmount(amount);
        setIsInitialized(true);
      } catch (error) {
        console.error('Error generating unique amount:', error);
        toast.error('Error generating payment amount');
        navigate('/');
      }
    };

    initializeAmount();
  }, [email, navigate]);

  if (!email || !uniqueAmount) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <PaymentInformationCard />
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
            blocksConfirmed={blocksConfirmed}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;