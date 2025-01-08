import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SubscriptionForm } from '../SubscriptionForm';
import { useTranslation } from 'react-i18next';

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SubscriptionDialog = ({ open, onOpenChange }: SubscriptionDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-dark-blue text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Join Tournament</DialogTitle>
          <DialogDescription className="text-light-gray text-center">
            Enter your details to join the trading tournament
          </DialogDescription>
        </DialogHeader>
        <SubscriptionForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDialog;