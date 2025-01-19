import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

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

	const handleLogout = async () => {
		await supabase.auth.signOut();
		navigate('/');
	};

	const handleLogin = () => {
		navigate('/auth');
	};

	useEffect(() => {
		// Check if there's a hash in the URL that contains access_token
		if (location.hash && location.hash.includes('access_token')) {
			// If it's a recovery flow (password reset), redirect to profile
			if (location.hash.includes('type=recovery')) {
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
		// If we're not on the home page, navigate to the home page + anchor
		if (location.pathname !== '/') {
			navigate('/' + href);
		} else {
			// Otherwise, just scroll on the current page
			document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
		}
		setIsOpen(false);
	};

	return (
		<div className="md:hidden relative">
			{/* Top-level mobile bar with improved spacing */}
			<div className="flex items-center gap-2 sm:gap-4">
				{user ? (
					<>
						<Button 
							variant="ghost" 
							onClick={() => navigate('/chart')} 
							className="text-bright-blue hover:bg-bright-blue/10 text-sm px-2 sm:px-4"
						>
							Charts
						</Button>
						<Button 
							variant="ghost" 
							onClick={() => navigate('/profile')} 
							className="text-bright-blue hover:bg-bright-blue/10 text-sm px-2 sm:px-4"
						>
							Profile
						</Button>
						<Button 
							variant="outline" 
							onClick={handleLogout} 
							className="border-bright-blue text-bright-blue hover:bg-bright-blue/10 text-sm px-2 sm:px-4"
						>
							Logout
						</Button>
					</>
				) : (
					<>
						<Button 
							variant="default" 
							className="bg-bright-blue hover:bg-bright-blue/90 text-sm px-2 sm:px-4" 
							onClick={onSubscribe}
						>
							Join
						</Button>
						<Button 
							variant="default" 
							className="bg-bright-blue hover:bg-bright-blue/90 text-sm px-2 sm:px-4" 
							onClick={handleLogin}
						>
							Login
						</Button>
						<Button 
							variant="ghost" 
							onClick={() => navigate('/chart')} 
							className="text-bright-blue hover:bg-bright-blue/10 text-sm px-2 sm:px-4"
						>
							Charts
						</Button>
					</>
				)}

				{/* Mobile menu toggle button - now properly positioned */}
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="text-white hover:text-bright-blue p-1"
					aria-label="Toggle menu"
				>
					{isOpen ? <X size={20} /> : <Menu size={20} />}
				</button>
			</div>

			{/* Expanded mobile menu with improved positioning and styling */}
			{isOpen && (
				<div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm w-screen border-t border-gray-800">
					<nav className="max-w-screen-xl mx-auto">
						<div className="px-4 py-2 space-y-1">
							{menuItems.map((item) => (
								<button
									key={item.label}
									onClick={() => handleNavigation(item.href)}
									className="block w-full text-left px-4 py-2 text-light-gray hover:text-bright-blue hover:bg-bright-blue/5 transition-colors duration-200 rounded-lg"
								>
									{item.label}
								</button>
							))}
						</div>
					</nav>
				</div>
			)}
		</div>
	);
};

export default MobileNav;