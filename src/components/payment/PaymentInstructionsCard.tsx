import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, AlertCircle, Shield, LockKeyhole, ShieldCheck, Copy, Check } from 'lucide-react';
import type { PaymentStatus } from '@/hooks/use-payment-verification';
import { useState } from 'react';
import { toast } from 'sonner';

interface PaymentInstructionsCardProps {
  amount: number;
  merchantAddress: string;
  transactionStatus: PaymentStatus;
}

export function PaymentInstructionsCard({ 
  amount, 
  merchantAddress,
  transactionStatus,
}: PaymentInstructionsCardProps) {
  const { t } = useTranslation();
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(merchantAddress);
      setHasCopied(true);
      toast.success('Address copied to clipboard');
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy address');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {t('payment.instructions.title')}
          <img src="/lovable-uploads/a60355ba-d2e6-4872-9a0b-8f62a6d25425.png" alt="USDT Tron" className="h-8" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/b5f41946-7cd2-43ca-a455-f346d9e6010e.png" 
            alt={t('payment.instructions.qrCodeAlt')}
            className="w-64 h-64"
          />
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">{t('payment.instructions.sendExactly')}</p>
          <p className="text-xl font-bold">{amount} USDT</p>
          <p className="text-sm text-gray-600 mt-2">{t('payment.instructions.toAddress')}</p>
          <div className="relative flex items-center justify-center gap-2">
            <p className="text-sm font-mono bg-gray-100 p-2 rounded break-all">
              {merchantAddress}
            </p>
            <button
              onClick={copyToClipboard}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Copy address to clipboard"
            >
              {hasCopied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-center space-x-4 pt-4">
          {transactionStatus === 'pending' && (
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center text-yellow-600">
                <AlertCircle className="mr-2" />
                {t('payment.status.pending')}
              </div>
              
              <div className="grid grid-cols-3 gap-8 pt-4 w-full max-w-md">
                <div className="flex flex-col items-center text-center">
                  <Shield className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-xs font-medium">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <LockKeyhole className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-xs font-medium">Encrypted</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <ShieldCheck className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-xs font-medium">Verified</span>
                </div>
              </div>
            </div>
          )}
          {transactionStatus === 'success' && (
            <div className="flex items-center text-green-600">
              <CheckCircle2 className="mr-2" />
              {t('payment.status.success')}
            </div>
          )}
          {transactionStatus === 'failed' && (
            <div className="flex items-center text-red-600">
              <AlertCircle className="mr-2" />
              {t('payment.status.failed')}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}