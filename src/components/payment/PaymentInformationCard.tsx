import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Shield, HelpCircle, Trophy, Bell } from 'lucide-react';

export function PaymentInformationCard() {
  const { t } = useTranslation();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t('payment.howItWorks.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-bright-blue mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium">{t('payment.howItWorks.confirmationTime.title')}</h3>
              <p className="text-sm text-gray-600">{t('payment.howItWorks.confirmationTime.description')}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Bell className="h-5 w-5 text-bright-blue mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium">{t('payment.howItWorks.autoNotification.title')}</h3>
              <p className="text-sm text-gray-600">{t('payment.howItWorks.autoNotification.description')}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">{t('payment.whyUsdt.title')}</h3>
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-bright-blue mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium">{t('payment.whyUsdt.security.title')}</h3>
              <p className="text-sm text-gray-600">{t('payment.whyUsdt.security.description')}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">{t('payment.support.title')}</h3>
          <div className="flex items-start space-x-3">
            <HelpCircle className="h-5 w-5 text-bright-blue mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium">{t('payment.support.questions.title')}</h3>
              <p className="text-sm text-gray-600">{t('payment.support.questions.description')}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">{t('payment.benefits.title')}</h3>
          <div className="flex items-start space-x-3">
            <Trophy className="h-5 w-5 text-bright-blue mt-1 flex-shrink-0" />
            <div>
              <ul className="space-y-2 text-sm text-gray-600">
                {t('payment.benefits.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index} className="list-disc ml-4">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}