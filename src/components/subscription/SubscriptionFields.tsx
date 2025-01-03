import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface SubscriptionFormData {
  name: string;
  email: string;
  acceptTerms: boolean;
}

interface SubscriptionFieldsProps {
  register: UseFormRegister<SubscriptionFormData>;
  errors: FieldErrors<SubscriptionFormData>;
}

export function SubscriptionFields({ register, errors }: SubscriptionFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name" className="text-lg font-medium text-white">
          Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-lg font-medium text-white">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="acceptTerms"
          onCheckedChange={(checked) => {
            const event = {
              target: {
                name: "acceptTerms",
                value: checked,
              },
            };
            register("acceptTerms").onChange(event);
          }}
        />
        <Label
          htmlFor="acceptTerms"
          className="text-sm font-medium leading-none text-white cursor-pointer"
        >
          I accept the terms and conditions
        </Label>
      </div>
      {errors.acceptTerms && (
        <p className="text-red-500 text-sm">{errors.acceptTerms.message}</p>
      )}
    </>
  );
}