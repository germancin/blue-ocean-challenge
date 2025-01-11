import { Button } from '../ui/button';
import { useAuth } from '../AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface DesktopNavProps {
  menuItems: Array<{ label: string; href: string }>;
  onSubscribe: () => void;
}

const DesktopNav = ({ menuItems, onSubscribe }: DesktopNavProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  return (
    <div className="hidden md:flex items-center space-x-8">
      {menuItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="text-light-gray hover:text-bright-blue transition-colors duration-200"
        >
          {item.label}
        </a>
      ))}
      {user ? (
        <div className="flex items-center space-x-4">
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
        </div>
      ) : (
        <Button 
          variant="default" 
          className="bg-bright-blue hover:bg-bright-blue/90"
          onClick={handleLogin}
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default DesktopNav;