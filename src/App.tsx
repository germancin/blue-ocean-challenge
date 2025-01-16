import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import Index from "./pages/Index";
import Payment from "./pages/Payment";
import AuthPage from "./pages/Auth";
import ProfilePage from "./pages/Profile";
import Terms from "./pages/Terms";
import { useAuth } from "./components/AuthProvider";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isPasswordReset = searchParams.get('changePassword') === 'true';
  const hash = window.location.hash;
  const hasAccessToken = hash && hash.includes('access_token') && hash.includes('type=recovery');

  if (loading) {
    return <div>Loading...</div>;
  }

  // Allow access if it's a password reset flow with valid token
  if (isPasswordReset && hasAccessToken) {
    return <>{children}</>;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/terms" element={<Terms />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;