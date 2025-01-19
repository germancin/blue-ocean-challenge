import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import type { AuthError } from '@supabase/supabase-js';

const AuthPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [isRecoveryFlow, setIsRecoveryFlow] = useState(false);

	useEffect(() => {
		// Remove sign up link and update forgot password link text
		const updateAuthLinks = () => {
			const signUpLink = document.querySelector('a[href="#auth-sign-up"]');
			if (signUpLink) {
				signUpLink.remove();
			}

			const forgotPasswordLink = document.querySelector('a[href="#auth-forgot-password"]');
			if (forgotPasswordLink) {
				forgotPasswordLink.textContent = 'Reset Your Password';
			}
		};

		// Initial check.
		updateAuthLinks();

		// Set up a MutationObserver to watch for DOM changes
		const observer = new MutationObserver(updateAuthLinks);
		observer.observe(document.body, { childList: true, subtree: true });

		// Check URL parameters for recovery flow
		const params = new URLSearchParams(window.location.search);
		const token = params.get('token');
		const type = params.get('type');

		if (token && type === 'recovery') {
			setIsRecoveryFlow(true);
			// Get email from token
			supabase.auth.getUser(token).then(({ data: { user } }) => {
				if (user?.email) {
					setEmail(user.email);
				}
			});
			return;
		}

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN' && session) {
				navigate('/chart');
			}
		});

		// Check if user is already logged in
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (session) {
				navigate('/chart');
			}
		});

		// Cleanup observer on component unmount
		return () => {
			subscription.unsubscribe();
			observer.disconnect();
		};
	}, [navigate]);

	const handlePasswordReset = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const params = new URLSearchParams(window.location.search);
			const token = params.get('token');

			if (!token) {
				throw new Error('No recovery token found');
			}

			const { error } = await supabase.auth.verifyOtp({
				token_hash: token,
				type: 'recovery',
			});

			if (error) throw error;

			const { error: updateError } = await supabase.auth.updateUser({
				password: password,
			});

			if (updateError) throw updateError;

			toast.success('Password set successfully! You can now log in.');
			navigate('/auth');
		} catch (error: any) {
			console.error('Password reset error:', error);
			setErrorMessage(error.message || 'Failed to set password');
			toast.error(error.message || 'Failed to set password');
		} finally {
			setIsLoading(false);
		}
	};

	const getErrorMessage = (error: AuthError) => {
		switch (error.message) {
			case 'Invalid login credentials':
				return 'Invalid email or password. Please check your credentials and try again.';
			case 'Email not confirmed':
				return 'Please verify your email address before signing in.';
			case 'User not found':
				return 'No user found with these credentials.';
			default:
				return error.message;
		}
	};

	if (isRecoveryFlow) {
		return (
			<div className="min-h-screen bg-navy flex items-center justify-center p-4">
				<div className="w-full max-w-md">
					<Card className="bg-white/10 backdrop-blur-lg border border-white/20">
						<CardHeader>
							<CardTitle className="text-2xl font-bold text-white text-center">Set Your Password</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={handlePasswordReset} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="email" className="text-white">
										Email
									</Label>
									<Input id="email" type="email" value={email} readOnly className="bg-white/5 border-white/10 text-white opacity-50" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="password" className="text-white">
										New Password
									</Label>
									<Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your new password" required minLength={6} className="bg-white/5 border-white/10 text-white" />
								</div>
								<Button type="submit" className="w-full" disabled={isLoading}>
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
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-navy flex items-center justify-center p-4">
			<div className="w-full max-w-md space-y-4">
				{errorMessage && (
					<Alert variant="destructive">
						<AlertDescription>{errorMessage}</AlertDescription>
					</Alert>
				)}
				<div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-white/20">
					<h1 className="text-2xl font-bold text-white text-center mb-6">Welcome to Trading Tournament</h1>
					<Auth
						supabaseClient={supabase}
						appearance={{
							theme: ThemeSupa,
							variables: {
								default: {
									colors: {
										brand: '#3B82F6',
										brandAccent: '#2563EB',
									},
								},
							},
						}}
						providers={[]}
						redirectTo={window.location.origin}
					/>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
