import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PaymentDetailsCardProps {
  amount: number;
  email: string;
}

export function PaymentDetailsCard({ amount, email }: PaymentDetailsCardProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('payment.details.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">{t('payment.details.amountDue')}</h3>
            <p className="text-3xl font-bold">${amount.toFixed(2)} USDT</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">{t('payment.details.orderDetails')}</h3>
            <p className="text-gray-600">{t('payment.details.description')}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">{t('payment.details.email')}</h3>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}