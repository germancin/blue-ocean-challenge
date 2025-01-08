import { Button } from '../ui/button';
import LanguageSelector from '../LanguageSelector';
import { useTranslation } from 'react-i18next';

interface DesktopNavProps {
  menuItems: Array<{ label: string; href: string }>;
  onSubscribe: () => void;
}

const DesktopNav = ({ menuItems, onSubscribe }: DesktopNavProps) => {
  const { t } = useTranslation();

  return (
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
        onClick={onSubscribe}
      >
        {t('nav.joinTournament')}
      </Button>
      <LanguageSelector />
    </div>
  );
};

export default DesktopNav;