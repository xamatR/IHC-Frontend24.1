import React from 'react';

const Legend: React.FC = () => {
  return (
    <div
      className="absolute bottom-20 left-6 bg-white p-4 rounded-lg shadow-lg z-50"
    >
      <div className="space-y-2">
        <div className="flex items-center">
          <span className="h-4 w-4 bg-blue-500 rounded-full mr-2" />
          <span className="text-gray-800">Shelters</span>
        </div>
        <div className="flex items-center">
          <span className="h-4 w-4 bg-green-500 rounded-full mr-2" />
          <span className="text-gray-800">Distribution Points</span>
        </div>
        <div className="flex items-center">
          <span className="h-4 w-4 bg-purple-500 rounded-full mr-2" />
          <span className="text-gray-800">Events</span>
        </div>
      </div>
      <div className="mt-4">
        <div className="font-medium mb-2 text-gray-900">Filters</div>
        <div className="space-y-2">
          <input type="checkbox" id="shelters" className="mr-2" />
          <label htmlFor="shelters" className="text-sm font-medium text-gray-700">
            Show Shelters
          </label>
        </div>
        <div className="space-y-2">
          <input type="checkbox" id="distribution" className="mr-2" />
          <label htmlFor="distribution" className="text-sm font-medium text-gray-700">
            Show Distribution Points
          </label>
        </div>
        <div className="space-y-2">
          <input type="checkbox" id="events" className="mr-2" />
          <label htmlFor="events" className="text-sm font-medium text-gray-700">
            Show Events
          </label>
        </div>
      </div>
    </div>
  );
};

export default Legend;
