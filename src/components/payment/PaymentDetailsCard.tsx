import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface PaymentDetailsCardProps {
  amount: number;
  email: string;
}

export function PaymentDetailsCard({ amount, email }: PaymentDetailsCardProps) {
  const [hasCopiedAmount, setHasCopiedAmount] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setHasCopiedAmount(true);
      setTimeout(() => setHasCopiedAmount(false), 2000);
      toast.success('Amount copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Amount Due</h3>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold bg-gray-100 px-3 py-1 rounded">${amount.toFixed(3)} USDT</p>
              <button
                onClick={() => copyToClipboard(amount.toString())}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Copy amount to clipboard"
              >
                {hasCopiedAmount ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium">Order Details</h3>
            <p className="text-gray-600">Your payment will be processed securely via USDT on the TRON network.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Email</h3>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}