import { Button } from "../ui/button";

interface SubscriptionButtonProps {
  isLoading: boolean;
}

export function SubscriptionButton({ isLoading }: SubscriptionButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium text-lg py-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
    >
      {isLoading ? "Processing..." : "Start Your Trading Journey Now 🚀"}
    </Button>
  );
}