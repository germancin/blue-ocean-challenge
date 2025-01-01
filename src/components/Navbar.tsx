import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const menuItems = [
    { label: t('nav.challenges'), href: '#challenges' },
    { label: t('nav.rewards'), href: '#rewards' },
    { label: t('nav.academy'), href: '#academy' },
    { label: t('nav.tournaments'), href: '#tournaments' },
    { label: t('nav.about'), href: '#about' },
  ];

  return (
    <nav className="fixed w-full bg-black/95 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 text-white font-bold text-xl">
            forTraders
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-light-gray hover:text-bright-blue transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <Button 
              variant="default" 
              className="bg-bright-blue hover:bg-bright-blue/90"
              onClick={() => window.location.href = '/payment'}
            >
              {t('nav.joinTournament')}
            </Button>
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Button 
              variant="default" 
              className="bg-bright-blue hover:bg-bright-blue/90"
              onClick={() => window.location.href = '/payment'}
            >
              {t('nav.joinTournament')}
            </Button>
            <LanguageSelector />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-bright-blue"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 text-light-gray hover:text-bright-blue transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;