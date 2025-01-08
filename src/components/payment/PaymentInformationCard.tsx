import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

interface PaymentInformationCardProps {
  onAcceptTerms: (accepted: boolean) => void;
}

export function PaymentInformationCard({ onAcceptTerms }: PaymentInformationCardProps) {
  const [accepted, setAccepted] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setAccepted(checked);
    onAcceptTerms(checked);
  };

  const paymentInfo = [
    {
      id: 1,
      title: 'Secure Payment',
      description: 'Your payment is protected by industry-standard security measures.'
    },
    {
      id: 2,
      title: 'Fast Processing',
      description: 'Quick and efficient transaction processing for your convenience.'
    },
    {
      id: 3,
      title: '24/7 Support',
      description: 'Our support team is available around the clock to assist you.'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
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
            I accept the terms and conditions
          </label>
        </div>
      </CardContent>
    </Card>
  );
}