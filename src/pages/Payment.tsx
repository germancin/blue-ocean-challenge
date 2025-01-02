import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PaymentDetailsCard } from '@/components/payment/PaymentDetailsCard';
import { PaymentInstructionsCard } from '@/components/payment/PaymentInstructionsCard';
import { PaymentInformationCard } from '@/components/payment/PaymentInformationCard';
import { usePaymentVerification } from '@/hooks/use-payment-verification';
import { generateUniqueAmount } from '@/utils/paymentUtils';
import { toast } from 'sonner';

const USDT_CONTRACT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
const MERCHANT_ADDRESS = 'TWM4e9QrTVUiZ67mrnC6EkaELvyQCwHb1t';
const BASE_AMOUNT = 2;

interface LocationState {
  email?: string;
}

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = (location.state as LocationState) || {};
  const [uniqueAmount, setUniqueAmount] = useState<number | null>(null);

  useEffect(() => {
    const initializeAmount = async () => {
      try {
        const amount = await generateUniqueAmount(BASE_AMOUNT);
        setUniqueAmount(amount);
      } catch (error) {
        console.error('Error generating unique amount:', error);
        toast.error('Error generating payment amount');
        navigate('/');
      }
    };

    if (email) {
      initializeAmount();
    }
  }, [email, navigate]);

  // Redirect if no email is provided or amount not generated
  if (!email || !uniqueAmount) {
    return null;
  }

  const { transactionStatus, blocksConfirmed } = usePaymentVerification({
    email,
    amount: uniqueAmount
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Payment Information */}
        <div className="lg:col-span-1">
          <PaymentInformationCard />
        </div>

        {/* Middle Column - Order Details */}
        <div className="lg:col-span-1">
          <PaymentDetailsCard 
            amount={uniqueAmount}
            email={email}
          />
        </div>

        {/* Right Column - Payment QR and Status */}
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