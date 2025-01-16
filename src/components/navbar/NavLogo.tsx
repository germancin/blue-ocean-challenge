import { useNavigate } from 'react-router-dom';

const NavLogo = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/')} 
      className="flex-shrink-0 text-white font-bold text-xl"
    >
      Elite<span className="bg-white text-navy px-2">Trader</span>Hub
    </button>
  );
};

export default NavLogo;