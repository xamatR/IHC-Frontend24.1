import React, { useRef } from 'react';
import Gmap from '@/components/Gmap';
import CurrentLocationButton from '@/components/CurrentLocationButton';

interface MapContainerProps {
  apiKey: string;
  mapRef: React.MutableRefObject<google.maps.Map | null>;
}

const MapContainer: React.FC<MapContainerProps> = ({ apiKey, mapRef }) => {

  // Função chamada quando o mapa é carregado
  const handleMapLoad = (map: google.maps.Map) => {
    console.log('Mapa carregado:', map);
    mapRef.current = map; // Definindo a referência do mapa carregado
  };

  // Função chamada quando o mapa é clicado
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log('Mapa clicado em:', lat, lng);
    }
  };

  // Função para centralizar o mapa em uma localização específica
  const centerMapOnLocation = (latitude: number, longitude: number) => {
    if (mapRef.current) {
      const position = new google.maps.LatLng(latitude, longitude);
      console.log('Centralizando o mapa em:', position);
      mapRef.current.setCenter(position);
      mapRef.current.setZoom(16); // Defina o zoom conforme necessário
    } else {
      console.log('Mapa ainda não foi carregado');
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Componente Gmap, passando handleMapLoad */}
      <Gmap apiKey={apiKey}/>

      {/* Botão de Localização Atual */}
      <CurrentLocationButton centerMapOnLocation={centerMapOnLocation} mapRef={mapRef} />
    </div>
  );
};

export default MapContainer;
