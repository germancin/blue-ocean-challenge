import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PaymentDetailsCardProps {
  amount: number;
  email: string;
}

export function PaymentDetailsCard({ amount, email }: PaymentDetailsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Elite Trading Tournament</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Amount Due</h3>
            <p className="text-3xl font-bold">${amount.toFixed(2)} USDT</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Order Details</h3>
            <p className="text-gray-600">One-time entry fee for participation in the Elite Trading Tournament</p>
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