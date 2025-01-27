import FooterLogo from './footer/FooterLogo';
import FooterLinkSection from './footer/FooterLinkSection';
import FooterBottom from './footer/FooterBottom';

const Footer = () => {
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
					<div>
						<FooterLogo />
					</div>
					{/* <FooterLinkSection title="Trade" links={footerLinks.trade} />
          <FooterLinkSection title="Learn & Participate" links={footerLinks.learn} />
          <FooterLinkSection title="Let's Connect" links={footerLinks.social} isExternal /> */}
				</div>
				<FooterBottom />
			</div>
		</footer>
	);
};

export default Footer;
