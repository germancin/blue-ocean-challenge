import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';

const USDT_CONTRACT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
const MERCHANT_ADDRESS = 'TEWmboRA5KRovRQkEKHjCBh5rNstiCuKya';
const AMOUNT = 2.50;

interface LocationState {
  email?: string;
}

const PaymentPage = () => {
  const [transactionStatus, setTransactionStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [paymentId, setPaymentId] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = (location.state as LocationState) || {};

  useEffect(() => {
    if (!email) {
      navigate('/');
      return;
    }

    // Create initial payment record with a unique payment ID
    const createPayment = async () => {
      const uniqueId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const { error } = await supabase
        .from('payments')
        .insert([
          { 
            email, 
            amount: AMOUNT,
            payment_id: uniqueId 
          }
        ]);

      if (error) {
        console.error('Error creating payment:', error);
        setTransactionStatus('failed');
        toast.error("Error creating payment record");
      } else {
        setPaymentId(uniqueId);
      }
    };

    createPayment();

    // Set up polling to check for payment
    const checkPayment = async () => {
      if (!paymentId) return false;

      try {
        console.log('Checking payment status for payment ID:', paymentId);
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { email, paymentId }
        });

        if (error) {
          console.error('Error checking payment:', error);
          toast.error("Error verifying payment");
          return false;
        }

        console.log('Payment verification response:', data);

        if (data.status === 'success') {
          setTransactionStatus('success');
          toast.success("Payment confirmed!");
          return true;
        } else if (data.status === 'no_payment_found') {
          setTransactionStatus('failed');
          toast.error("Payment record not found");
          return true;
        }

      } catch (error) {
        console.error('Error checking payment:', error);
        toast.error("Error checking payment status");
      }
      return false;
    };

    // Check every 30 seconds
    const intervalId = setInterval(async () => {
      const shouldStop = await checkPayment();
      if (shouldStop) {
        clearInterval(intervalId);
      }
    }, 30000);
    
    // Initial check
    checkPayment();

    return () => {
      clearInterval(intervalId);
    };
  }, [email, navigate, paymentId]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Order Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Elite Trading Tournament</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Amount Due</h3>
                  <p className="text-3xl font-bold">${AMOUNT.toFixed(2)} USDT</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Order Details</h3>
                  <p className="text-gray-600">One-time entry fee for participation in the Elite Trading Tournament</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Email</h3>
                  <p className="text-gray-600">{email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Payment QR and Status */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Pay with USDT (TRC20)
                <img src="/lovable-uploads/a60355ba-d2e6-4872-9a0b-8f62a6d25425.png" alt="USDT Tron" className="h-8" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/b5f41946-7cd2-43ca-a455-f346d9e6010e.png" 
                  alt="Payment QR Code" 
                  className="w-64 h-64"
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Send exactly</p>
                <p className="text-xl font-bold">{AMOUNT} USDT</p>
                <p className="text-sm text-gray-600 mt-2">to address:</p>
                <p className="text-sm font-mono bg-gray-100 p-2 rounded break-all">
                  {MERCHANT_ADDRESS}
                </p>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800 font-medium">Important: Add this ID in your transaction memo</p>
                  <p className="text-sm font-mono bg-white mt-2 p-2 rounded border border-yellow-200">
                    {paymentId}
                  </p>
                </div>
              </div>
              <div className="flex justify-center space-x-4 pt-4">
                {transactionStatus === 'pending' && (
                  <div className="flex items-center text-yellow-600">
                    <AlertCircle className="mr-2" />
                    Waiting for payment...
                  </div>
                )}
                {transactionStatus === 'success' && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle2 className="mr-2" />
                    Payment confirmed!
                  </div>
                )}
                {transactionStatus === 'failed' && (
                  <div className="flex items-center text-red-600">
                    <AlertCircle className="mr-2" />
                    Payment verification failed
                  </div>
                )}
              </div>
              <div className="flex justify-center pt-4">
                <Shield className="text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Secure USDT Payment</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;