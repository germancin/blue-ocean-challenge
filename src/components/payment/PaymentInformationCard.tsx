import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Zap, Clock, HeartHandshake, Lock, ShieldCheck } from 'lucide-react';

export function PaymentInformationCard() {
  const paymentInfo = [
    {
      id: 1,
      title: 'Secure Transaction',
      description: 'Your payment is protected by industry-standard encryption and security protocols.',
      icon: Shield,
      color: 'text-blue-600'
    },
    {
      id: 2,
      title: 'Instant Processing',
      description: 'Experience lightning-fast transaction processing with immediate confirmation.',
      icon: Zap,
      color: 'text-yellow-600'
    },
    {
      id: 3,
      title: '24/7 Support',
      description: 'Our dedicated support team is here to help you at any time, day or night.',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      id: 4,
      title: 'Trusted Platform',
      description: 'Join thousands of satisfied users who trust our secure payment platform.',
      icon: HeartHandshake,
      color: 'text-purple-600'
    },
    {
      id: 5,
      title: 'Data Protection',
      description: 'Your personal and payment information is fully encrypted and never shared.',
      icon: Lock,
      color: 'text-red-600'
    },
    {
      id: 6,
      title: 'Verified Process',
      description: 'Our payment process is verified by leading security authorities.',
      icon: ShieldCheck,
      color: 'text-indigo-600'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {paymentInfo.map((info) => {
            const IconComponent = info.icon;
            return (
              <div key={info.id} className="flex items-start space-x-4">
                <div className={`${info.color} p-2 rounded-full bg-gray-50`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">{info.title}</h3>
                  <p className="text-sm text-gray-600">{info.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}