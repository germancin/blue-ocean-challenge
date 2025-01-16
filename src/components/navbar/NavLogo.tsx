import { useNavigate } from 'react-router-dom';

const NavLogo = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/')} 
      className="flex items-center space-x-2"
    >
      <img
        src="/lovable-uploads/d11caddd-8007-4df4-a318-84d02ffe2e34.png"
        alt="EliteTraderHub Logo"
        className="h-8 w-8"
      />
      <span className="text-white font-bold text-xl">EliteTraderHub</span>
    </button>
  );
};

export default NavLogo;