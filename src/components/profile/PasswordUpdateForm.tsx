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
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const type = searchParams.get('type');

  useEffect(() => {
    const getEmailFromToken = async () => {
      try {
        console.log('Token:', token);
        console.log('Type:', type);
        
        if (token && type === 'recovery') {
          // First, try to get the user from the recovery token
          const { data: { user }, error } = await supabase.auth.getUser();
          console.log('Initial user data:', user);
          
          if (error) {
            console.error('Error getting user:', error);
          }

          if (!user) {
            // If no user is found, verify the token
            const { data, error: verifyError } = await supabase.auth.verifyOtp({
              token_hash: token,
              type: 'recovery',
            });
            
            console.log('Verify OTP response:', data);
            
            if (verifyError) {
              console.error('Error verifying token:', verifyError);
              toast.error('Invalid or expired recovery link. Please request a new one.');
              navigate('/auth');
              return;
            }

            if (data?.user?.email) {
              console.log('Setting email from token verification:', data.user.email);
              setUserEmail(data.user.email);
            } else {
              console.error('No email found in token verification response');
              toast.error('Could not retrieve email from recovery token');
              navigate('/auth');
            }
          } else {
            // If user exists in session, use that email
            console.log('Setting email from session:', user.email);
            setUserEmail(user.email);
          }
        } else {
          // Fallback to getting email from session
          const { data: { user } } = await supabase.auth.getUser();
          if (user?.email) {
            console.log('Setting email from session fallback:', user.email);
            setUserEmail(user.email);
          } else {
            console.error('No user found in session');
            toast.error('Could not retrieve user email');
            navigate('/auth');
          }
        }
      } catch (error) {
        console.error('Error in getEmailFromToken:', error);
        toast.error('An error occurred while retrieving your information');
        navigate('/auth');
      } finally {
        setVerifying(false);
      }
    };

    getEmailFromToken();
  }, [token, type, navigate]);

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
      const { error } = await supabase.auth.updateUser({ 
        password: values.newPassword 
      });

      if (error) throw error;

      toast.success('Password set successfully! You can now log in.');
      form.reset();
      
      // Redirect to login page after successful password update
      navigate('/auth');
    } catch (error: any) {
      toast.error(error.message || 'Failed to set password');
    } finally {
      setIsLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Verifying your recovery link...</p>
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-sm text-red-600">Unable to verify your recovery link. Please request a new one.</p>
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