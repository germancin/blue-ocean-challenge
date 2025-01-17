import { useLocation, Navigate } from 'react-router-dom';
import { usePaymentVerification } from '@/hooks/use-payment-verification';
import { PaymentInformationCard } from '@/components/payment/PaymentInformationCard';
import { PaymentDetailsCard } from '@/components/payment/PaymentDetailsCard';
import { PaymentInstructionsCard } from '@/components/payment/PaymentInstructionsCard';

const Payment = () => {
  const location = useLocation();
  const email = location.state?.email;

  const { isVerifying, paymentStatus } = usePaymentVerification(email);

  if (!email) {
    return <Navigate to="/" />;
  }

  if (paymentStatus === 'success') {
    return <Navigate to="/chart" />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PaymentInformationCard onAcceptTerms={() => {}} />
          <PaymentDetailsCard amount={99.99} email={email} />
          <PaymentInstructionsCard 
            amount={99.99}
            merchantAddress={import.meta.env.VITE_MERCHANT_ADDRESS || ''}
            transactionStatus={paymentStatus || 'pending'}
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;