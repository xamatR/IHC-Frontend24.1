import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface MobileLegendButtonProps {
  isLegendOpen: boolean;
  toggleLegend: () => void;
}

const MobileLegendButton: React.FC<MobileLegendButtonProps> = ({ toggleLegend }) => {
    return (
        <Button className="absolute bottom-6 left-6 shadow-lg bg-blue-600 text-white hover:bg-blue-900 transition-all w-12 h-12" size="icon" onClick={toggleLegend}>
        <Filter />
      </Button>
    );
  };

export default MobileLegendButton;
