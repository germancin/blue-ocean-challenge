import { Link } from 'react-router-dom';

const FooterBottom = () => {
  const currentYear = new Date().getFullYear();

  return (
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
  );
};

export default FooterBottom;