import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';

const passwordSchema = z
	.object({
		newPassword: z.string().min(6, 'Password must be at least 6 characters'),
		confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export function PasswordUpdateForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [verifying, setVerifying] = useState(true);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const { user } = useAuth();

	useEffect(() => {
		const initializeForm = async () => {
			try {
				console.log('Starting form initialization');
				const { data: { session }, error: sessionError } = await supabase.auth.getSession();
				
				if (sessionError) {
					console.error('Session error:', sessionError);
					throw new Error('Failed to get session');
				}

				console.log('Session data:', session);

				if (session?.user?.email) {
					console.log('User email from session:', session.user.email);
					setUserEmail(session.user.email);
				} else {
					console.error('No user email in session');
					throw new Error('No user email found');
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
	}, [navigate]);

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
				password: values.newPassword,
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
				<Loader2 className="h-8 w-8 animate-spin text-bright-blue" />
				<p className="text-sm text-white/70">Verifying your request...</p>
			</div>
		);
	}

	if (!userEmail) {
		return (
			<div className="flex flex-col items-center justify-center space-y-4">
				<p className="text-sm text-red-400">Unable to verify your request. Please try again.</p>
				<Button onClick={() => navigate('/auth')} className="bg-bright-blue hover:bg-bright-blue/90">Return to Login</Button>
			</div>
		);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="space-y-2" style={{ display: 'none' }}>
					<FormLabel className="text-white">Email</FormLabel>
					<Input 
						type="email" 
						value={userEmail} 
						disabled 
						className="bg-white/5 text-white/50" 
					/>
				</div>

				<FormField
					control={form.control}
					name="newPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-white">Password</FormLabel>
							<div className="relative">
								<FormControl>
									<Input 
										type={showNewPassword ? "text" : "password"} 
										{...field}
										className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-bright-blue focus:ring-bright-blue"
									/>
								</FormControl>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
									onClick={() => setShowNewPassword(!showNewPassword)}
								>
									{showNewPassword ? (
										<EyeOff className="h-4 w-4 text-white/70" />
									) : (
										<Eye className="h-4 w-4 text-white/70" />
									)}
								</Button>
							</div>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-white">Repeat Password</FormLabel>
							<div className="relative">
								<FormControl>
									<Input 
										type={showConfirmPassword ? "text" : "password"} 
										{...field}
										className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-bright-blue focus:ring-bright-blue"
									/>
								</FormControl>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								>
									{showConfirmPassword ? (
										<EyeOff className="h-4 w-4 text-white/70" />
									) : (
										<Eye className="h-4 w-4 text-white/70" />
									)}
								</Button>
							</div>
							<FormMessage className="text-red-400" />
						</FormItem>
					)}
				/>

				<Button 
					type="submit" 
					disabled={isLoading} 
					className="w-full bg-bright-blue hover:bg-bright-blue/90 text-white"
				>
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