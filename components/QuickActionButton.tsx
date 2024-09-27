import React from 'react';
import { Plus, MapPin, Home, Calendar, AlertTriangle } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const QuickActionButton: React.FC = () => {

    const router = useRouter();

  return (
    <Popover>
        
      <PopoverTrigger asChild>
        <Button
          className="absolute bottom-6 right-6 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-900 w-12 h-12"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 bg-white shadow-lg p-4">
        <div className="grid gap-4">
          <Link href={'/registerHomeless'} passHref onClick={() => router.push('/registerHomeless')}>
          <Button
            variant="outline"
            className="w-full flex justify-start items-center rounded-lg bg-blue-600 text-white hover:bg-blue-900 transition-colors border border-blue-500"
          >
            <Plus className="mr-2 h-4 w-4 text-white" />
            Adicionar morador
          </Button>
          </Link>
          <Button
            variant="outline"
            className="w-full flex justify-start items-center rounded-lg bg-blue-600 text-white hover:bg-blue-900 focus:bg-blue-900 transition-colors border border-blue-500"
          >
            <Home className="mr-2 h-4 w-4 text-white" />
            Oferta de ajuda
          </Button>
          <Button
            variant="outline"
            className="w-full flex justify-start items-center rounded-lg bg-blue-600 text-white hover:bg-blue-900 focus:bg-blue-900 transition-colors border border-blue-500"
          >
            <Calendar className="mr-2 h-4 w-4 text-white" />
            Criar evento
          </Button>

          {/* Line to separate the buttons */}
          <div className="h-px w-full bg-gray-300" />
          <Link href={'/reportEmergency'} passHref onClick={() => router.push('/reportEmergency')}>
          <Button
            variant="outline"
            className="w-full flex justify-start items-center rounded-lg bg-red-600 text-white hover:bg-red-900 focus:bg-red-900 transition-colors border border-red-500"
          >
                 <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
            Reportar emergência
          </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default QuickActionButton;
