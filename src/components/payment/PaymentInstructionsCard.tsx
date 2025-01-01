import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import type { PaymentStatus } from '@/hooks/use-payment-verification';

interface PaymentInstructionsCardProps {
  amount: number;
  merchantAddress: string;
  paymentId: string;
  transactionStatus: PaymentStatus;
}

export function PaymentInstructionsCard({ 
  amount, 
  merchantAddress, 
  paymentId,
  transactionStatus 
}: PaymentInstructionsCardProps) {
  return (
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
          <p className="text-xl font-bold">{amount} USDT</p>
          <p className="text-sm text-gray-600 mt-2">to address:</p>
          <p className="text-sm font-mono bg-gray-100 p-2 rounded break-all">
            {merchantAddress}
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
  );
}