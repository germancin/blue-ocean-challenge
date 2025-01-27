import { Button } from '../ui/button';
import { useAuth } from '../AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface DesktopNavProps {
	menuItems: Array<{ label: string; href: string }>;
	onSubscribe: () => void;
}

const DesktopNav = ({ menuItems, onSubscribe }: DesktopNavProps) => {
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
	};

	return (
		<div className="hidden md:flex items-center space-x-8">
			{menuItems.map((item) => (
				<button key={item.label} onClick={() => handleNavigation(item.href)} className="text-light-gray hover:text-bright-blue transition-colors duration-200">
					{item.label}
				</button>
			))}
			{user ? (
				<div className="flex items-center space-x-4">
					{/* <Button variant="ghost" onClick={() => navigate('/chart')} className="text-bright-blue hover:bg-[#D3E4FD] hover:text-[#0FA0CE] transition-colors duration-200">
						Charts
					</Button>
					<Button variant="ghost" onClick={() => navigate('/profile')} className="text-bright-blue hover:bg-[#E5DEFF] hover:text-[#7E69AB] transition-colors duration-200">
						Profile
					</Button> */}
					{/* <Button variant="outline" onClick={handleLogout} className="border-bright-blue text-bright-blue hover:bg-bright-blue hover:text-white transition-colors duration-200">
						Logout
					</Button> */}
				</div>
			) : (
				<div className="flex items-center space-x-4">
					<Button variant="default" className="bg-bright-blue hover:bg-bright-blue/90" onClick={onSubscribe}>
						Únete al Evento
					</Button>
					{/* <Button variant="default" className="bg-bright-blue hover:bg-bright-blue/90" onClick={handleLogin}>
						Login
					</Button> */}
				</div>
			)}
		</div>
	);
};

export default DesktopNav;
