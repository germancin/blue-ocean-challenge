import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Link } from "react-router-dom";
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
          className="w-full px-4 py-3 rounded-lg bg-white text-dark-gray border-0 focus:ring-2 focus:ring-bright-blue focus:border-transparent transition-all duration-200"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
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
          className="w-full px-4 py-3 rounded-lg bg-white text-dark-gray border-0 focus:ring-2 focus:ring-bright-blue focus:border-transparent transition-all duration-200"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="acceptTerms"
          className="h-5 w-5 border-2 border-white data-[state=checked]:bg-bright-blue data-[state=checked]:border-bright-blue"
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
          className="text-sm font-medium leading-none text-white/80 cursor-pointer"
        >
          I accept the{" "}
          <Link
            to="/terms"
            className="text-bright-blue hover:text-bright-blue/80 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            terms and conditions
          </Link>
        </Label>
      </div>
      {errors.acceptTerms && (
        <p className="text-red-400 text-sm mt-1">{errors.acceptTerms.message}</p>
      )}
    </>
  );
}