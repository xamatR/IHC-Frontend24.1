import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationsPopoverProps {
  notifications: number;
}

const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({ notifications }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-6 w-6 text-white" />
          {notifications > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              {notifications}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4 bg-white rounded-lg shadow-lg">
        <div className="text-gray-900 mb-2 text-center font-bold text-lg">Notificações</div>
        <div className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-900">Novos Eventos <br /> Disponíveis</div>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white w-20 text-center"
            >
              Detalhes
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-900">Oferta de Ajuda <br /> foi aceita</div>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white w-20 text-center"
            >
              Detalhes
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
