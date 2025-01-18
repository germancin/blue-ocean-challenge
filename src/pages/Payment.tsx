import { useLocation, Navigate } from 'react-router-dom';
import { PaymentInformationCard } from '@/components/payment/PaymentInformationCard';
import { PaymentDetailsCard } from '@/components/payment/PaymentDetailsCard';
import { PaymentInstructionsCard } from '@/components/payment/PaymentInstructionsCard';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Payment = () => {
	const location = useLocation();
	const email = location.state?.email;
	const paymentStatus = location.state?.paymentStatus;
	const paymentAmount = location.state?.paymentAmount;
	const [merchantAddress, setMerchantAddress] = useState('');

	useEffect(() => {
		const fetchMerchantAddress = async () => {
			const {
				data: { MERCHANT_ADDRESS },
				error,
			} = await supabase.functions.invoke('get-merchant-address');
			if (error) {
				console.error('Error fetching merchant address:', error);
				return;
			}
			setMerchantAddress(MERCHANT_ADDRESS);
		};

		fetchMerchantAddress();
	}, []);

	if (!email) {
		return <Navigate to="/" />;
	}

	if (paymentStatus === 'success') {
		return <Navigate to="/chart" />;
	}

	// if (paymentStatus === 'pending' || !paymentAmount) {
	// 	return (
	// 		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
	// 			<div className="text-center">
	// 				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
	// 				<p className="mt-4 text-gray-600">Initializing payment...</p>
	// 			</div>
	// 		</div>
	// 	);
	// }

	return (
		<div className="min-h-screen bg-gray-100 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<PaymentInformationCard onAcceptTerms={() => {}} />
					<PaymentDetailsCard amount={paymentAmount} email={email} />
					<PaymentInstructionsCard amount={paymentAmount} merchantAddress={merchantAddress} transactionStatus={paymentStatus || 'pending'} />
				</div>
			</div>
		</div>
	);
};

export default Payment;
