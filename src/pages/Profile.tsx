import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { PasswordUpdateForm } from '@/components/profile/PasswordUpdateForm';
import { toast } from 'sonner';

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
      toast.info("Please set your password to secure your account", {
        duration: 5000,
      });
    }
  }, [shouldShowPasswordForm]);

  const { data: payments, isLoading } = useQuery({
    queryKey: ['payments', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payments')
        .select('amount, created_at, status, transaction_hash')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Payment[];
    },
    enabled: !!user,
  });

  const totalPaid = payments?.reduce((sum, payment) => 
    payment.status === 'success' ? sum + Number(payment.amount) : sum, 0
  ) || 0;

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-lg">{user.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Paid</h3>
                <p className="mt-1 text-lg">${totalPaid.toFixed(3)} USDT</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {shouldShowPasswordForm && (
          <Card className="border-2 border-blue-500">
            <CardHeader>
              <CardTitle>Set Your Password</CardTitle>
            </CardHeader>
            <CardContent>
              <PasswordUpdateForm />
            </CardContent>
          </Card>
        )}

        {!shouldShowPasswordForm && (
          <Card>
            <CardHeader>
              <CardTitle>Update Password</CardTitle>
            </CardHeader>
            <CardContent>
              <PasswordUpdateForm />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : payments?.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No payment history found.</p>
            ) : (
              <div className="space-y-4">
                {payments?.map((payment, index) => (
                  <div 
                    key={index} 
                    className="border rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">${Number(payment.amount).toFixed(3)} USDT</p>
                      <p className="text-sm text-gray-500">
                        {new Date(payment.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          payment.status === 'success' 
                            ? 'bg-green-100 text-green-800' 
                            : payment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                      {payment.transaction_hash && (
                        <a
                          href={`https://tronscan.org/#/transaction/${payment.transaction_hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
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
      </div>
    </div>
  );
};

export default ProfilePage;