import { useState } from 'react';
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
import { useLocation } from 'react-router-dom';

// Different schema based on whether it's initial setup or password update
const getPasswordSchema = (isInitialSetup: boolean) => {
  const baseSchema = {
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  };

  if (!isInitialSetup) {
    return z.object({
      currentPassword: z.string().min(6, 'Password must be at least 6 characters'),
      ...baseSchema,
    }).refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
  }

  return z.object(baseSchema).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
};

export function PasswordUpdateForm() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isInitialSetup = searchParams.get('changePassword') === 'true';
  const email = searchParams.get('email') || '';

  const form = useForm({
    resolver: zodResolver(getPasswordSchema(isInitialSetup)),
    defaultValues: {
      ...(isInitialSetup ? {} : { currentPassword: '' }),
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ 
        password: values.newPassword 
      });

      if (error) throw error;

      toast.success('Password set successfully! You can now log in.');
      form.reset();
    } catch (error: any) {
      toast.error(error.message || 'Failed to set password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {email && (
          <div className="space-y-2">
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} disabled />
          </div>
        )}
        
        {!isInitialSetup && (
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isInitialSetup ? 'Password' : 'New Password'}</FormLabel>
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
              {isInitialSetup ? 'Setting Password...' : 'Updating Password...'}
            </>
          ) : (
            isInitialSetup ? 'Set Password' : 'Update Password'
          )}
        </Button>
      </form>
    </Form>
  );
}