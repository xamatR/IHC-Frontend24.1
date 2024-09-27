import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CurrentLocationButtonProps {
    centerMapOnLocation: (latitude: number, longitude: number) => void; // Função que vai centralizar o mapa
    mapRef: React.RefObject<google.maps.Map>;
}

const CurrentLocationButton: React.FC<CurrentLocationButtonProps> = ({ centerMapOnLocation, mapRef }) => {
    const handleGetCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let { latitude, longitude } = position.coords;
                    centerMapOnLocation(latitude, longitude);
                },
                (error) => {
                    console.error("Error getting location", error);
                }
            );
        } else {
            alert("Geolocalização não é suportada por este navegador.");
        }
    };

    return (

            <Button 
                className="fixed bottom-20 right-6 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-900 transition-all w-12 h-12 z-20" 
                size="icon" 
                onClick={handleGetCurrentLocation}
            >
                <MapPin className="h-8 w-8" />
            </Button>
    );
};

export default CurrentLocationButton;
