import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

interface PaymentInformationCardProps {
  onAcceptTerms: (accepted: boolean) => void;
}

export function PaymentInformationCard({ onAcceptTerms }: PaymentInformationCardProps) {
  const { t } = useTranslation();
  const [accepted, setAccepted] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setAccepted(checked);
    onAcceptTerms(checked);
  };

  const paymentInfo = [
    {
      id: 1,
      title: t('payment.info.secure'),
      description: t('payment.info.secureDesc')
    },
    {
      id: 2,
      title: t('payment.info.fast'),
      description: t('payment.info.fastDesc')
    },
    {
      id: 3,
      title: t('payment.info.support'),
      description: t('payment.info.supportDesc')
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('payment.info.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {paymentInfo.map((info) => (
            <div key={info.id} className="space-y-2">
              <h3 className="text-lg font-medium">{info.title}</h3>
              <p className="text-sm text-gray-600">{info.description}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={accepted}
            onCheckedChange={handleCheckboxChange}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t('payment.info.acceptTerms')}
          </label>
        </div>
      </CardContent>
    </Card>
  );
}