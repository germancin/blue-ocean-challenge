import { Button } from "../ui/button";

interface SubscriptionButtonProps {
  isLoading: boolean;
}

export function SubscriptionButton({ isLoading }: SubscriptionButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-medium text-lg py-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
    >
      {isLoading ? "Processing..." : "Register"}
    </Button>
  );
}