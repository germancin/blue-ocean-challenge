import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PaymentInformationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Please review your payment information carefully before proceeding with the transaction.
          </p>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-medium text-yellow-800">Important Notice</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Make sure to send the exact amount specified to complete your registration.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}