import { Button } from '../ui/button';

interface DesktopNavProps {
  menuItems: Array<{ label: string; href: string }>;
  onSubscribe: () => void;
}

const DesktopNav = ({ menuItems, onSubscribe }: DesktopNavProps) => {
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
        Join Tournament
      </Button>
    </div>
  );
};

export default DesktopNav;