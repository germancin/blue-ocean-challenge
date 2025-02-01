import { Button } from '../ui/button';
import { useAuth } from '../AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

interface DesktopNavProps {
	menuItems: Array<{ label: string; href: string }>;
	onSubscribe: () => void;
}

const DesktopNav = ({ menuItems, onSubscribe }: DesktopNavProps) => {
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
	};

	const isNextStepPage = location.pathname === '/next-step';

	return (
		<div className="hidden md:flex items-center space-x-8">
			{menuItems.map((item) => (
				<button key={item.label} onClick={() => handleNavigation(item.href)} className="text-light-gray hover:text-bright-blue transition-colors duration-200">
					{t(item.label)}
				</button>
			))}
			{user ? (
				<div className="flex items-center space-x-4">
					{/* <Button variant="ghost" onClick={() => navigate('/chart')} className="text-bright-blue hover:bg-[#D3E4FD] hover:text-[#0FA0CE] transition-colors duration-200">
						{t('nav.charts')}
					</Button>
					<Button variant="ghost" onClick={() => navigate('/profile')} className="text-bright-blue hover:bg-[#E5DEFF] hover:text-[#7E69AB] transition-colors duration-200">
						{t('nav.profile')}
					</Button> */}
					{/* <Button variant="outline" onClick={handleLogout} className="border-bright-blue text-bright-blue hover:bg-bright-blue hover:text-white transition-colors duration-200">
						{t('nav.logout')}
					</Button> */}
				</div>
			) : (
				<div className="flex items-center space-x-4">
					{!isNextStepPage && (
						<Button variant="default" className="bg-bright-blue hover:bg-bright-blue/90" onClick={onSubscribe}>
							{t('nav.joinEvent')}
						</Button>
					)}
					{/* <Button variant="default" className="bg-bright-blue hover:bg-bright-blue/90" onClick={handleLogin}>
						{t('nav.login')}
					</Button> */}
				</div>
			)}
			<LanguageSelector />
		</div>
	);
};

export default DesktopNav;