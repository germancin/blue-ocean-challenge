import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import type { PaymentStatus } from '@/hooks/use-payment-verification';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PaymentInstructionsCardProps {
  amount: number;
  merchantAddress: string;
  paymentId: string;
  transactionStatus: PaymentStatus;
  blocksConfirmed?: number;
}

export function PaymentInstructionsCard({ 
  amount, 
  merchantAddress, 
  paymentId,
  transactionStatus,
  blocksConfirmed = 0
}: PaymentInstructionsCardProps) {
  const { t } = useTranslation();

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
          <p className="text-sm font-mono bg-gray-100 p-2 rounded break-all">
            {merchantAddress}
          </p>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 font-medium">{t('payment.instructions.memoImportant')}</p>
            <p className="text-sm font-mono bg-white mt-2 p-2 rounded border border-yellow-200">
              {paymentId}
            </p>
          </div>
        </div>
        <Alert>
          <RefreshCw className="h-4 w-4" />
          <AlertDescription>
            This page automatically checks for payment confirmation every 30 seconds. No need to refresh.
          </AlertDescription>
        </Alert>
        <div className="flex justify-center space-x-4 pt-4">
          {transactionStatus === 'pending' && (
            <div className="flex items-center text-yellow-600">
              <AlertCircle className="mr-2" />
              {t('payment.status.pending')}
              {blocksConfirmed > 0 && (
                <span className="ml-2 text-sm bg-yellow-100 px-2 py-1 rounded">
                  {blocksConfirmed} blocks confirmed
                </span>
              )}
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
        <div className="flex justify-center pt-4">
          <Shield className="text-gray-400 mr-2" />
          <span className="text-sm text-gray-600">{t('payment.instructions.securePayment')}</span>
        </div>
      </CardContent>
    </Card>
  );
}