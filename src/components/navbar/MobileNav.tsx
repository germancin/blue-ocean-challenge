import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  menuItems: Array<{ label: string; href: string }>;
  onSubscribe: () => void;
}

const MobileNav = ({ isOpen, setIsOpen, menuItems, onSubscribe }: MobileNavProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  useEffect(() => {
    // Check if there's a hash in the URL that contains access_token
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      // If it's a recovery flow (password reset), redirect to profile
      if (hash.includes('type=recovery')) {
        navigate('/profile?changePassword=true');
        return;
      }
    }
    
    // Handle regular hash navigation for sections
    if (location.hash && !location.hash.includes('access_token')) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location, navigate]);

  const handleNavigation = (href: string) => {
    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <div className="md:hidden flex items-center space-x-4">
        {user ? (
          <>
            <Button 
              variant="default" 
              className="bg-bright-blue hover:bg-bright-blue/90"
              onClick={onSubscribe}
            >
              Join Tournament
            </Button>
            <Button 
              variant="ghost"
              onClick={() => navigate('/profile')}
              className="text-bright-blue hover:bg-bright-blue/10"
            >
              Profile
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-bright-blue text-bright-blue hover:bg-bright-blue/10"
            >
              Logout
            </Button>
          </>
        ) : (
          <Button 
            variant="default" 
            className="bg-bright-blue hover:bg-bright-blue/90"
            onClick={handleLogin}
          >
            Login
          </Button>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-bright-blue"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.href)}
                className="block w-full text-left px-3 py-2 text-light-gray hover:text-bright-blue transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;