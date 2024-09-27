import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: -3.745,  // Default coordinates
  lng: -38.523,
};

interface GmapProps {
  apiKey: string;

}

const Gmap: React.FC<GmapProps> = ({ apiKey }) => {
  const [center, setCenter] = useState(defaultCenter);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setLoading(false);
        },
        () => {
          console.error('Geolocation permission denied');
          setLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading map...</div>;
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          clickableIcons: false,
          gestureHandling: 'auto',
        }}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Gmap;
