import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

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
	const { t } = useTranslation();

	const handleLogout = async () => {
		await supabase.auth.signOut();
		navigate('/');
	};

	const handleLogin = () => {
		navigate('/auth');
	};

	useEffect(() => {
		if (location.hash && location.hash.includes('access_token')) {
			if (location.hash.includes('type=recovery')) {
				navigate('/profile?changePassword=true');
				return;
			}
		}

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

	const isNextStepPage = location.pathname === '/next-step';

	return (
		<div className="md:hidden relative">
			<div className="flex justify-end items-center gap-4">
				<LanguageSelector />
				<button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-bright-blue p-2" aria-label="Toggle menu">
					{isOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{isOpen && (
				<div className="absolute top-full right-0 bg-black/95 backdrop-blur-sm w-64 border-t border-gray-800 rounded-b-lg shadow-xl">
					<nav className="py-4">
						<div className="px-4 space-y-2">
							{!user && !isNextStepPage && (
								<Button variant="default" className="w-full justify-start bg-bright-blue hover:bg-bright-blue/90" onClick={onSubscribe}>
									{t('nav.joinEvent')}
								</Button>
							)}

							{user && (
								<div className="space-y-2 border-b border-gray-800 pb-4 mb-4">
									<Button variant="ghost" onClick={() => navigate('/chart')} className="w-full justify-start text-bright-blue hover:bg-bright-blue/10">
										{t('nav.charts')}
									</Button>
									<Button variant="ghost" onClick={() => navigate('/profile')} className="w-full justify-start text-bright-blue hover:bg-bright-blue/10">
										{t('nav.profile')}
									</Button>
								</div>
							)}

							<div className="space-y-2 border-b border-gray-800 pb-4">
								{menuItems.map((item) => (
									<button key={item.label} onClick={() => handleNavigation(item.href)} className="block w-full text-left px-4 py-2 text-light-gray hover:text-bright-blue hover:bg-bright-blue/5 transition-colors duration-200 rounded-lg">
										{t(item.label)}
									</button>
								))}
							</div>

							{user ? (
								<button onClick={handleLogout} className="w-full text-left px-4 py-2 text-bright-blue hover:text-bright-blue/80 hover:bg-bright-blue/5 transition-colors duration-200 rounded-lg">
									{t('nav.logout')}
								</button>
							) : (
								<button onClick={handleLogin} className="w-full text-left px-4 py-2 text-bright-blue hover:text-bright-blue/80 hover:bg-bright-blue/5 transition-colors duration-200 rounded-lg">
									{t('nav.login')}
								</button>
							)}
						</div>
					</nav>
				</div>
			)}
		</div>
	);
};

export default MobileNav;