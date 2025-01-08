import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    trade: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Enter Trading Challenge', href: '/trading-challenge' },
      { label: 'Premium Program', href: '/premium' },
      { label: 'Trading Instruments', href: '/instruments' },
      { label: 'Trading Platforms', href: '/platforms' },
      { label: 'Purchase Challenge', href: '/purchase' },
      { label: 'Lot Size Calculator', href: '/calculator' },
      { label: 'Log In', href: '/login' },
    ],
    learn: [
      { label: 'Academy', href: '/academy' },
      { label: 'About Us', href: '/about' },
      { label: 'FAQs & Support', href: '/support' },
      { label: 'Affiliate Program', href: '/affiliate' },
      { label: 'For Traders vs FTMO', href: '/comparison' },
      { label: 'Challenge PRO', href: '/pro' },
      { label: 'Contact', href: '/contact' },
    ],
    social: [
      { label: 'X.com', href: 'https://x.com' },
      { label: 'Instagram', href: 'https://instagram.com' },
      { label: 'Youtube', href: 'https://youtube.com' },
      { label: 'Discord', href: 'https://discord.com' },
      { label: 'Facebook', href: 'https://facebook.com' },
      { label: 'TikTok', href: 'https://tiktok.com' },
    ],
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo Section */}
          <div>
            <Link to="/" className="text-2xl font-bold text-neon-green">
              Elite<span className="bg-white text-cyber-black px-2">Trader</span>Hub
            </Link>
          </div>

          {/* Trade Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Trade</h3>
            <ul className="space-y-2">
              {footerLinks.trade.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn & Participate Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Learn & Participate</h3>
            <ul className="space-y-2">
              {footerLinks.learn.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Let's Connect Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Let's Connect</h3>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-sm text-gray-400">
              © {currentYear} BLN Tech Club DMCC. All rights reserved.
            </div>
            <div className="flex gap-4 text-sm text-gray-400 md:justify-end">
              <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/press" className="hover:text-white">Press Kit</Link>
            </div>
          </div>
          
          <div className="mt-8 text-xs text-gray-500 space-y-4">
            <p>For Traders is an education and evaluation company that does not collect customer deposits or offer financial services to customers. All accounts provided to customers are in a virtual environment with virtual money.</p>
            <p>All information provided on this website is for educational purposes only in the area of financial market trading and does not serve in anyway as specific investment recommendations, trading recommendations, analysis of investment opportunities or similar general recommendations regarding the trading of investment instruments. The Company does not provide investment services within the meaning of MiFID I.The Company is not a licensed investment services provider (securities broker-dealer) within the meaning of MiFID II.All trading on the platform made available as part of the services provided by the Company, although it may be based on real trading data and simulates real trading, is only notional trading on a demo account. In this sense, that it is fictitious trading on fictitious accounts, terms such as "trading" or "trader" should also be understood and should not be given the meanings they have in the context of real trading.</p>
            <p>The technical solution offered in the form of platforms made available as part of the services offered by the Company (i.e. platforms for fictitious trading on demo accounts) uses third party services.The website is operated and owned by the Company and all content is copyrighted by the Company.</p>
            <p>Restricted countries: Pakistan, Iran, Syria, Myanmar, Bangladesh, Vietnam, North Korea, the Russian Federation, the Republic of Belarus, Cuba, Lebanon, Libya, Sudan, Crimea, Donetsk and Luhansk regions of Ukraine, United Arab Emirates.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;