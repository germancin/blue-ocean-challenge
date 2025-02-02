import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface PaymentDetailsCardProps {
	amount: number;
	email: string;
}

export function PaymentDetailsCard({ amount, email }: PaymentDetailsCardProps) {
	const { t } = useTranslation();
	const [hasCopiedAmount, setHasCopiedAmount] = useState(false);

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setHasCopiedAmount(true);
			setTimeout(() => setHasCopiedAmount(false), 2000);
			toast.success(t('paymentDetailsCard.copySuccess'));
		} catch (err) {
			toast.error(t('paymentDetailsCard.copyError'));
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t('paymentDetailsCard.title')}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div>
						<h3 className="text-lg font-medium">{t('paymentDetailsCard.amountToPay')}</h3>
						<div className="flex items-center gap-2">
							<p className="text-3xl font-bold bg-gray-100 px-3 py-1 rounded">${amount.toFixed(3)} USDT</p>
							<button onClick={() => copyToClipboard(amount.toString())} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label={t('paymentDetailsCard.copySuccess')}>
								{hasCopiedAmount ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-gray-500" />}
							</button>
						</div>
					</div>
					<div>
						<h3 className="text-lg font-medium">{t('paymentDetailsCard.purchaseDetailTitle')}</h3>
						<p className="text-gray-600">{t('paymentDetailsCard.purchaseDetailDescription')}</p>
					</div>
					<div>
						<h3 className="text-lg font-medium">{t('paymentDetailsCard.emailTitle')}</h3>
						<p className="text-gray-600">{email}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
