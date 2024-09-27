import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchBar: React.FC = () => {
  return (
    <div className="absolute top-20 left-4 right-4 z-50">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
        <Input className="pl-10 py-2 rounded-full shadow-md bg-white text-gray-800 border border-blue-500 focus:border-blue-600 focus:outline-none" placeholder="Procure por eventos, pessoas ou abrigos" />
      </div>
    </div>
  );
};

export default SearchBar;
