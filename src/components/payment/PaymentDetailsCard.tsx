import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface PaymentDetailsCardProps {
	amount: number;
	email: string;
}

export function PaymentDetailsCard({ amount, email }: PaymentDetailsCardProps) {
	const [hasCopiedAmount, setHasCopiedAmount] = useState(false);

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setHasCopiedAmount(true);
			setTimeout(() => setHasCopiedAmount(false), 2000);
			toast.success('Cantidad copiada al portapapeles');
		} catch (err) {
			toast.error('Error al copiar al portapapeles');
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Detalles de Pago</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div>
						<h3 className="text-lg font-medium">Monto a Pagar</h3>
						<div className="flex items-center gap-2">
							<p className="text-3xl font-bold bg-gray-100 px-3 py-1 rounded">${amount.toFixed(3)} USDT</p>
							<button onClick={() => copyToClipboard(amount.toString())} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Copy amount to clipboard">
								{hasCopiedAmount ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-gray-500" />}
							</button>
						</div>
					</div>
					<div>
						<h3 className="text-lg font-medium">Detalle de la Compra</h3>
						<p className="text-gray-600">Tu pago se procesará de forma segura a través de USDT en la red TRON.</p>
					</div>
					<div>
						<h3 className="text-lg font-medium">Correo Electrónico</h3>
						<p className="text-gray-600">{email}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
