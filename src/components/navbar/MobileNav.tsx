import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import LanguageSelector from '../LanguageSelector';
import { useTranslation } from 'react-i18next';

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  menuItems: Array<{ label: string; href: string }>;
  onSubscribe: () => void;
}

const MobileNav = ({ isOpen, setIsOpen, menuItems, onSubscribe }: MobileNavProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="md:hidden flex items-center space-x-4">
        <Button 
          variant="default" 
          className="bg-bright-blue hover:bg-bright-blue/90"
          onClick={onSubscribe}
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
    </>
  );
};

export default MobileNav;