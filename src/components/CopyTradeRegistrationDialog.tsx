import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CopyTradeRegistrationForm } from "./CopyTradeRegistrationForm";
import { useTranslation } from "react-i18next";

interface CopyTradeRegistrationDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const CopyTradeRegistrationDialog = ({ open, onOpenChange }: CopyTradeRegistrationDialogProps) => {
	const { t } = useTranslation();

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px] bg-[#1A1F2C] backdrop-blur-sm p-8 rounded-xl shadow-xl border border-white/10">
				<DialogHeader>
					<DialogTitle className="text-3xl font-bold text-center text-white mb-2">{t("copyTradeRegistration.title")}</DialogTitle>
				</DialogHeader>
				<div className="mt-4">
					<CopyTradeRegistrationForm onSuccess={() => onOpenChange(false)} />
					<p className="text-center text-sm text-gray-400 mt-4">{t("copyTradeRegistration.disclaimer")}</p>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CopyTradeRegistrationDialog;
