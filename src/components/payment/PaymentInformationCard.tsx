import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";

interface PaymentInformationCardProps {
  onAcceptTerms?: (accepted: boolean) => void;
}

export function PaymentInformationCard({ onAcceptTerms }: PaymentInformationCardProps) {
  const { register, formState: { errors } } = useForm();

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

          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptTerms"
              className="h-5 w-5 border-2 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              onCheckedChange={(checked) => {
                onAcceptTerms?.(checked as boolean);
              }}
            />
            <Label
              htmlFor="acceptTerms"
              className="text-sm font-medium leading-none cursor-pointer"
            >
              I accept the terms and conditions
            </Label>
          </div>
          {errors.acceptTerms && (
            <p className="text-red-500 text-sm">{errors.acceptTerms?.message?.toString()}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}