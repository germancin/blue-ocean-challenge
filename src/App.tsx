import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import Index from './pages/Index';
import Payment from './pages/Payment';
import AuthPage from './pages/Auth';
import ProfilePage from './pages/Profile';
import Terms from './pages/Terms';
import ChartPage from './pages/Chart';
import NextStep from './pages/NextStep';
import I18nEditor from './pages/I18nEditor';
import { useAuth } from './components/AuthProvider';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { user, loading } = useAuth();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const token = searchParams.get('token');
	const type = searchParams.get('type');
	const changePassword = searchParams.get('changePassword');
	const isPasswordReset = (type === 'recovery' && token) || changePassword === 'true';

	if (loading) {
		return <div>Loading...</div>;
	}

	if (isPasswordReset) {
		return <>{children}</>;
	}

	if (!user) {
		return <Navigate to="/auth" />;
	}

	return <>{children}</>;
};

const RedirectIfAuthenticated = ({ children }: { children: React.ReactNode }) => {
	const { user, loading } = useAuth();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const token = searchParams.get('token');
	const type = searchParams.get('type');
	const isPasswordReset = type === 'recovery' && token;

	if (loading) {
		return <div>Loading...</div>;
	}

	return <>{children}</>;
};

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<TooltipProvider>
					<Toaster />
					<Sonner />
					<BrowserRouter>
						<Routes>
							<Route
								path="/"
								element={
									<RedirectIfAuthenticated>
										<Index />
									</RedirectIfAuthenticated>
								}
							/>
							<Route
								path="/auth"
								element={
									<RedirectIfAuthenticated>
										<AuthPage />
									</RedirectIfAuthenticated>
								}
							/>
							<Route path="/payment" element={<Payment />} />
							<Route path="/terms" element={<Terms />} />
							<Route path="/next-step" element={<NextStep />} />
							<Route
								path="/profile"
								element={
									<ProtectedRoute>
										<ProfilePage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/chart"
								element={
									<ProtectedRoute>
										<ChartPage />
									</ProtectedRoute>
								}
							/>
							<Route path="/i18n-editor" element={<I18nEditor />} />
						</Routes>
					</BrowserRouter>
				</TooltipProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default App;
