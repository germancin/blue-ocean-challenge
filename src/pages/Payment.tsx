import { useLocation, useNavigate } from 'react-router-dom';
import { PaymentDetailsCard } from '@/components/payment/PaymentDetailsCard';
import { PaymentInstructionsCard } from '@/components/payment/PaymentInstructionsCard';
import { PaymentInformationCard } from '@/components/payment/PaymentInformationCard';
import { usePaymentVerification } from '@/hooks/use-payment-verification';

const USDT_CONTRACT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
const MERCHANT_ADDRESS = 'TWM4e9QrTVUiZ67mrnC6EkaELvyQCwHb1t';
const AMOUNT = 2.50;

interface LocationState {
  email?: string;
}

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = (location.state as LocationState) || {};

  // Redirect if no email is provided
  if (!email) {
    navigate('/');
    return null;
  }

  const { transactionStatus, blocksConfirmed } = usePaymentVerification({
    email,
    amount: AMOUNT
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
            amount={AMOUNT}
            email={email}
          />
        </div>

        {/* Right Column - Payment QR and Status */}
        <div className="lg:col-span-1">
          <PaymentInstructionsCard 
            amount={AMOUNT}
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