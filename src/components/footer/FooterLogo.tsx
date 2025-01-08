import { Link } from 'react-router-dom';

const FooterLogo = () => {
  return (
    <Link to="/" className="text-2xl font-bold">
      Elite<span className="bg-white text-navy px-2">Trader</span>Hub
    </Link>
  );
};

export default FooterLogo;