import { useNavigate } from "react-router-dom";
import NavLogo from "./navbar/NavLogo";
import LanguageSelector from "./navbar/LanguageSelector";

const CopyTradeNavbar = () => {
	const navigate = useNavigate();

	return (
		<nav className="fixed w-full bg-black/95 backdrop-blur-sm z-50">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					<NavLogo />
					<LanguageSelector />
				</div>
			</div>
		</nav>
	);
};

export default CopyTradeNavbar;
