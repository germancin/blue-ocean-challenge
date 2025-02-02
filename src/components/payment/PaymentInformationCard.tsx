import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface PaymentInformationCardProps {
  onAcceptTerms: () => void;
}

export const PaymentInformationCard = ({ onAcceptTerms }: PaymentInformationCardProps) => {
  const [accepted, setAccepted] = useState(false);

  const handleAcceptTerms = () => {
    setAccepted(!accepted);
    onAcceptTerms();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription>
          Please review the payment information and terms below
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            By proceeding with this payment, you agree to our terms and conditions.
          </p>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={accepted}
              onCheckedChange={handleAcceptTerms}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I accept the terms and conditions
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};