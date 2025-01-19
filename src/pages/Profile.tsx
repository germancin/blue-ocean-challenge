import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { PasswordUpdateForm } from '@/components/profile/PasswordUpdateForm';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

interface Payment {
	amount: number;
	created_at: string;
	status: string;
	transaction_hash: string | null;
}

const ProfilePage = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const shouldShowPasswordForm = searchParams.get('changePassword') === 'true';

	useEffect(() => {
		if (shouldShowPasswordForm) {
			toast.info('Please set your password to secure your account', {
				duration: 5000,
			});
		}
	}, [shouldShowPasswordForm]);

	const { data: payments, isLoading } = useQuery({
		queryKey: ['payments', user?.email],
		queryFn: async () => {
			if (!user?.email) return [];

			const { data, error } = await supabase
				.from('payments')
				.select('amount, created_at, status, transaction_hash')
				.eq('email', user.email)
				.order('created_at', { ascending: false });

			if (error) throw error;
			return data as Payment[];
		},
		enabled: !!user,
	});

	const totalPaid = payments?.reduce((sum, payment) => (payment.status === 'success' ? sum + Number(payment.amount) : sum), 0) || 0;

	return (
		<div className="min-h-screen bg-navy">
			<Navbar />
			<div className="container mx-auto px-4 pt-24">
				{shouldShowPasswordForm ? (
					<Card className="border-2 border-bright-blue bg-navy/50 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="text-white">Set Your Password</CardTitle>
						</CardHeader>
						<CardContent>
							<PasswordUpdateForm />
						</CardContent>
					</Card>
				) : (
					<>
						<Card className="bg-navy/50 backdrop-blur-sm border-bright-blue/20 mb-8">
							<CardHeader>
								<CardTitle className="text-white">Profile Information</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h3 className="text-sm font-medium text-gray-400">Email</h3>
										<p className="mt-1 text-lg text-white">{user?.email}</p>
									</div>
									<div>
										<h3 className="text-sm font-medium text-gray-400">Total Paid</h3>
										<p className="mt-1 text-lg text-white">${totalPaid.toFixed(3)} USDT</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-navy/50 backdrop-blur-sm border-bright-blue/20 mb-8">
							<CardHeader>
								<CardTitle className="text-white">Update Password</CardTitle>
							</CardHeader>
							<CardContent>
								<PasswordUpdateForm />
							</CardContent>
						</Card>

						<Card className="bg-navy/50 backdrop-blur-sm border-bright-blue/20">
							<CardHeader>
								<CardTitle className="text-white">Payment History</CardTitle>
							</CardHeader>
							<CardContent>
								{isLoading ? (
									<div className="flex justify-center py-8">
										<Loader2 className="h-8 w-8 animate-spin text-bright-blue" />
									</div>
								) : payments?.length === 0 ? (
									<p className="text-center text-gray-400 py-8">No payment history found.</p>
								) : (
									<div className="space-y-4">
										{payments?.map((payment, index) => (
											<div key={index} className="border border-bright-blue/20 rounded-lg p-4 flex justify-between items-center bg-navy/30">
												<div>
													<p className="font-medium text-white">${Number(payment.amount).toFixed(3)} USDT</p>
													<p className="text-sm text-gray-400">{new Date(payment.created_at).toLocaleDateString()}</p>
												</div>
												<div className="flex items-center space-x-2">
													<span className={`px-2 py-1 rounded-full text-xs font-medium ${payment.status === 'success' ? 'bg-green-900/50 text-green-400' : payment.status === 'pending' ? 'bg-yellow-900/50 text-yellow-400' : 'bg-red-900/50 text-red-400'}`}>{payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}</span>
													{payment.transaction_hash && (
														<a href={`https://tronscan.org/#/transaction/${payment.transaction_hash}`} target="_blank" rel="noopener noreferrer" className="text-sm text-bright-blue hover:text-bright-blue/80">
															View Transaction
														</a>
													)}
												</div>
											</div>
										))}
									</div>
								)}
							</CardContent>
						</Card>
					</>
				)}
			</div>
		</div>
	);
};

export default ProfilePage;