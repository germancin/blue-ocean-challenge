import { useState } from 'react';
import NavLogo from './navbar/NavLogo';
import DesktopNav from './navbar/DesktopNav';
import MobileNav from './navbar/MobileNav';
import SubscriptionDialog from './navbar/SubscriptionDialog';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const menuItems = [
    { label: 'Rules', href: '#rules' },
    { label: 'Prizes', href: '#prizes' },
    { label: 'Distribution', href: '#distribution' },
    { label: 'Strategy', href: '#strategy' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <nav className="fixed w-full bg-black/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <NavLogo />
            <DesktopNav 
              menuItems={menuItems} 
              onSubscribe={() => setShowSubscriptionModal(true)} 
            />
            <MobileNav 
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              menuItems={menuItems}
              onSubscribe={() => setShowSubscriptionModal(true)}
            />
          </div>
        </div>
      </nav>

      <SubscriptionDialog 
        open={showSubscriptionModal} 
        onOpenChange={setShowSubscriptionModal} 
      />
    </>
  );
};

export default Navbar;