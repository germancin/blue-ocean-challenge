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
import ChartPage from "./pages/Chart";
import { useAuth } from "./components/AuthProvider";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const type = searchParams.get('type');
  const changePassword = searchParams.get('changePassword');
  
  // Only allow password reset if there's both a token and it's a recovery flow
  const isValidPasswordReset = type === 'recovery' && token;

  if (loading) {
    return <div>Loading...</div>;
  }

  // If not authenticated and not a valid password reset, redirect to auth
  if (!user && !isValidPasswordReset) {
    const currentPath = `${location.pathname}${location.search}`;
    return <Navigate to={`/auth?redirect=${encodeURIComponent(currentPath)}`} />;
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
            <Route 
              path="/chart" 
              element={
                <ProtectedRoute>
                  <ChartPage />
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