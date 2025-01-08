import { Card, CardContent } from '@/components/ui/card';
import { Clock, Bell, Shield, HelpCircle, Trophy } from 'lucide-react';

export function PaymentInformationCard() {
  const sections = [
    {
      id: 'payment-works',
      title: 'How Payment Works',
      items: [
        {
          icon: Clock,
          title: 'Confirmation Time',
          description: 'Transactions on the TRON network (TRC20) are fast and usually confirm in less than 1 minute. However, in rare cases, it may take up to 5 minutes depending on network traffic.',
          color: 'text-blue-600'
        },
        {
          icon: Bell,
          title: 'Automatic Notification',
          description: 'Once the payment is confirmed on the blockchain, you will receive an email notification with your tournament registration details.',
          color: 'text-yellow-600'
        }
      ]
    },
    {
      id: 'why-usdt',
      title: 'Why Use USDT',
      items: [
        {
          icon: Shield,
          title: 'Secure Transactions',
          description: 'USDT transactions are secure and traceable on the blockchain',
          color: 'text-green-600'
        }
      ]
    },
    {
      id: 'support',
      title: 'Support Policy',
      items: [
        {
          icon: HelpCircle,
          title: 'Have Questions?',
          description: 'If you have any issues with your transaction, our team is here to help. Write to us at support@elitetraderhub.com.',
          color: 'text-purple-600'
        }
      ]
    },
    {
      id: 'benefits',
      title: 'Benefits of Participating',
      items: [
        {
          icon: Trophy,
          title: 'Tournament Benefits',
          description: [
            'Exclusive access to the Elite Trading Tournament, where you can win amazing prizes.',
            'Connect with a community of passionate traders.',
            'A unique opportunity to test your skills in a competitive environment.'
          ],
          color: 'text-indigo-600'
        }
      ]
    }
  ];

  return (
    <Card>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="space-y-2">
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <div className="space-y-3">
                {section.items.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`${item.color} p-1.5 rounded-full bg-gray-50 flex-shrink-0`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="text-sm font-medium">{item.title}</h3>
                        {Array.isArray(item.description) ? (
                          <ul className="text-xs text-gray-600 space-y-1 list-disc pl-3">
                            {item.description.map((bullet, idx) => (
                              <li key={idx}>{bullet}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-gray-600">{item.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}