import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SubscriptionForm } from '../SubscriptionForm';

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SubscriptionDialog = ({ open, onOpenChange }: SubscriptionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#1A1F2C] text-white p-8 rounded-xl border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center mb-6">
            Unlock Your Trading Potential Today! 🚀
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <SubscriptionForm onSuccess={() => onOpenChange(false)} />
          <p className="text-center text-sm text-gray-400 mt-4">
            Join our trusted community of traders. Your data is secure and we'll only send you tournament updates and essential news. ✨
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDialog;