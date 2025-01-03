import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Bell, Shield, HelpCircle, Trophy } from "lucide-react";
import { useTranslation } from "react-i18next";

export function PaymentInformationCard() {
  const { t } = useTranslation();
  
  // Cast the benefits to string array to ensure proper typing
  const benefits = t('payment.benefits.items', { returnObjects: true }) as string[];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('payment.howItWorks.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h3 className="font-medium">{t('payment.howItWorks.confirmationTime.title')}</h3>
                <p className="text-sm text-gray-600">
                  {t('payment.howItWorks.confirmationTime.description')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h3 className="font-medium">{t('payment.howItWorks.autoNotification.title')}</h3>
                <p className="text-sm text-gray-600">
                  {t('payment.howItWorks.autoNotification.description')}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-3">{t('payment.whyUsdt.title')}</h3>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h4 className="font-medium">{t('payment.whyUsdt.security.title')}</h4>
                <p className="text-sm text-gray-600">
                  {t('payment.whyUsdt.security.description')}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-3">{t('payment.support.title')}</h3>
            <div className="flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h4 className="font-medium">{t('payment.support.questions.title')}</h4>
                <p className="text-sm text-gray-600">
                  {t('payment.support.questions.description')}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-3">{t('payment.benefits.title')}</h3>
            <div className="flex items-start gap-3">
              <Trophy className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <ul className="space-y-2 text-sm text-gray-600">
                  {benefits.map((benefit: string, index: number) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}