import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';

const passwordSchema = z.object({
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function PasswordUpdateForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Get URL parameters
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const type = params.get('type');
  const changePassword = params.get('changePassword');

  console.log('URL Parameters:', { token, type, changePassword });

  useEffect(() => {
    const initializeForm = async () => {
      try {
        console.log('Starting form initialization');
        
        // Recovery flow with token
        if (token && (type === 'recovery' || changePassword === 'true')) {
          console.log('Starting token verification process with token:', token);
          
          // Verify the recovery token
          const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'recovery',
          });

          console.log('Verify OTP response:', { verifyData, verifyError });

          if (verifyError) {
            console.error('Error verifying token:', verifyError);
            throw new Error('Invalid or expired recovery link');
          }

          if (!verifyData?.user?.email) {
            console.error('No email found in verification response:', verifyData);
            throw new Error('Could not retrieve email from recovery token');
          }

          console.log('Successfully verified token for email:', verifyData.user.email);
          setUserEmail(verifyData.user.email);
        } else {
          console.error('Invalid request parameters:', { token, type, changePassword });
          throw new Error('Invalid password reset request');
        }
      } catch (error: any) {
        console.error('Error in initializeForm:', error);
        toast.error(error.message || 'An error occurred while verifying your request');
        navigate('/auth');
      } finally {
        setVerifying(false);
      }
    };

    initializeForm();
  }, [token, type, changePassword, navigate]);

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    setIsLoading(true);
    try {
      console.log('Attempting to update password for email:', userEmail);
      
      const { error } = await supabase.auth.updateUser({ 
        password: values.newPassword 
      });

      if (error) {
        console.error('Error updating password:', error);
        throw error;
      }

      console.log('Password updated successfully');
      toast.success('Password set successfully! You can now log in.');
      form.reset();
      navigate('/auth');
    } catch (error: any) {
      console.error('Failed to set password:', error);
      toast.error(error.message || 'Failed to set password');
    } finally {
      setIsLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Verifying your request...</p>
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-sm text-red-600">Unable to verify your request. Please try again.</p>
        <Button onClick={() => navigate('/auth')}>Return to Login</Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <FormLabel>Email</FormLabel>
          <Input type="email" value={userEmail} disabled className="bg-muted" />
        </div>

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting Password...
            </>
          ) : (
            'Set Password'
          )}
        </Button>
      </form>
    </Form>
  );
}