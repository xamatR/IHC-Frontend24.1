"use client"
import React, { useState, useRef, useEffect } from "react";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import MapContainer from "@/components/MapContainer";
import QuickActionButton from "@/components/QuickActionButton";
import Legend from "@/components/Legend";
import MobileLegendButton from "@/components/MobileLegendButton";
import CurrentLocationButton from "@/components/CurrentLocationButton";
import { Home, Calendar } from 'lucide-react';

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(2);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  let mapRef = useRef<google.maps.Map | null>(null); // Agora o mapa é referenciado aqui

  const links = [
    { name: 'Home', href: '/', icon: <Home className="h-6 w-6" /> },
    { name: 'Eventos', href: '/eventos', icon: <Calendar className="h-6 w-6" /> },
  ];


  const centerMapOnLocation = () => {
    if (mapRef.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          mapRef.current?.panTo(new google.maps.LatLng(latitude, longitude));
          mapRef.current?.setZoom(15);
        },
        () => {
          console.error('Geolocation permission denied');
        }
      );
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-blue-50">
      <MapContainer apiKey={apiKey as string} mapRef={mapRef} />
      <NavBar
        notifications={notifications}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        links={links}
      />
      <SearchBar />
      <QuickActionButton />
      <MobileLegendButton
        isLegendOpen={isLegendOpen}
        toggleLegend={() => setIsLegendOpen(!isLegendOpen)}
      />
      {isLegendOpen && <Legend />}
      <CurrentLocationButton centerMapOnLocation={centerMapOnLocation} mapRef={mapRef} />
    </div>
  );
}
