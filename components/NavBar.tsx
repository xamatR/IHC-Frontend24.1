import React from 'react';
import { Bell, Menu, Home, Info, Calendar } from 'lucide-react'; // Import your icons
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NotificationsPopover from './NotificationsPopover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link'; // For Next.js
import { useRouter } from 'next/navigation';

interface NavBarProps {
  notifications: number;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  links: { name: string; href: string; icon: React.ReactNode }[]; // Links array with icons
}

const NavBar: React.FC<NavBarProps> = ({ notifications, isMenuOpen, setIsMenuOpen, links }) => {
  const router = useRouter();
  return (
    <nav className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-blue-600 shadow-lg">
      {/* Left Section (Dynamic Links with Icons) */}
      <div className="flex items-center space-x-4">
        {links.map((link) => (
          <Link key={link.name} href={link.href} passHref onClick={() => router.push(link.href)}>
            <span className="flex items-center space-x-2 text-white text-lg hover:text-gray-300 transition-all cursor-pointer">
              {link.icon} {/* Icon */}
              <span>{link.name}</span> {/* Link Name */}
            </span>
          </Link>
        ))}
      </div>

      {/* Right Section (Hamburger Menu and Notifications) */}
      <div className="flex items-center space-x-6">
        <NotificationsPopover notifications={notifications} />

        {/* Hamburger Menu Icon (on the far right) */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-white hover:text-gray-300 transition-all" />
            </Button>
          </SheetTrigger>
          <SheetContent className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50">
          <div className="flex flex-col h-full p-4">
              <div className="flex items-center space-x-4 mb-8">
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback>GM</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-lg text-gray-600">Gabriel Matta</div>
                  <Button variant="link" className="p-0 h-auto text-sm text-blue-600" onClick={() => router.push('/profile')}>
                    Ver Perfil
                  </Button>
                </div>
              </div>
              <nav className="space-y-4 flex-1">
                <Button variant="ghost" className="w-full justify-start text-blue-600">
                  Minhas Atividades
                </Button>
                <Button variant="ghost" className="w-full justify-start text-blue-600">
                  Ajuda & Suporte
                </Button>
              </nav>
              <Button variant="ghost" className="justify-center bg-red-600 text-white">
                Sair
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default NavBar;
