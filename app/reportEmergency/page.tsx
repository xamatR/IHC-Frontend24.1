"use client";
import React, { useState } from 'react';
import { MapPin, Save, XCircle } from 'lucide-react';
import NavBar from '@/components/NavBar';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { Home, Calendar } from 'lucide-react';

const homelessPeople = [
    { id: 1, name: 'João Silva' },
    { id: 2, name: 'Maria Santos' },
    { id: 3, name: 'Carlos Oliveira' },
    { id: 4, name: 'Ana Pereira' },
];

const ReportEmergency = () => {
    const [emergencyType, setEmergencyType] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [selectedPerson, setSelectedPerson] = useState('');
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [menu, setMenu] = useState(false);
    

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const links = [
        { name: 'Home', href: '/', icon: <Home className="h-6 w-6" /> },
        { name: 'Eventos', href: '/eventos', icon: <Calendar className="h-6 w-6" /> },
    ];

    const handlePlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            setLocation(place.formatted_address || '');
        }
    };

    const handleSelectPerson = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPerson(e.target.value);
    };

    // Função para converter latitude e longitude em endereço usando a API de Geocoding do Google
    const reverseGeocode = (latitude: number, longitude: number) => {
        const geocoder = new google.maps.Geocoder();
        const latlng = { lat: latitude, lng: longitude };

        geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK") {
                if (results && results[0]) {
                    setLocation(results[0].formatted_address);
                } else {
                    alert("Nenhum endereço encontrado.");
                }
            } else {
                alert("Geocoder falhou devido a: " + status);
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            console.log('Relatório de emergência enviado!', {
                emergencyType,
                description,
                location,
                selectedPerson,
            });
            setIsSubmitting(false);
            alert('Emergência reportada com sucesso!');
        }, 2000);
    };

    return (
        <>
            <NavBar notifications={2} isMenuOpen={menu} setIsMenuOpen={setMenu} links={links} />
            <div className="container mx-auto px-4 py-8 bg-white pt-20">
                <h1 className="text-4xl font-bold text-center text-red-600 mb-6">Reportar Emergência</h1>

                <form onSubmit={handleSubmit} className="bg-gray-100 rounded-lg shadow-lg p-6 space-y-4">
                    {/* Seleção do morador de rua */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Morador de Rua</label>
                        <select
                            value={selectedPerson}
                            onChange={handleSelectPerson}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        >
                            <option value="">Selecione um morador</option>
                            {homelessPeople.map((person) => (
                                <option key={person.id} value={person.name}>
                                    {person.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tipo de Emergência */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo de Emergência</label>
                        <select
                            value={emergencyType}
                            onChange={(e) => setEmergencyType(e.target.value)}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        >
                            <option value="">Selecione um tipo</option>
                            <option value="Falta de alimentos">Falta de alimentos</option>
                            <option value="Problemas de saúde">Problemas de saúde</option>
                            <option value="Alojamento temporário">Alojamento temporário</option>
                            <option value="Roupas e agasalhos">Roupas e agasalhos</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>

                    {/* Descrição */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descrição</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
                            rows={4}
                            placeholder="Descreva a emergência..."
                            required
                        />
                    </div>

                    {/* Localização */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Localização</label>
                        <div className="flex items-center space-x-2">
                            <LoadScript googleMapsApiKey={apiKey as string} libraries={['places']}>
                                <Autocomplete onLoad={(autocomplete) => setAutocomplete(autocomplete)} onPlaceChanged={handlePlaceChanged}>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
                                        placeholder="Digite a localização ou use o botão"
                                        required
                                    />
                                </Autocomplete>
                            </LoadScript>
                            <button
                                type="button"
                                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-900"
                                onClick={() => navigator.geolocation.getCurrentPosition((position) => {
                                    const { latitude, longitude } = position.coords;
                                    reverseGeocode(latitude, longitude);
                                })}
                            >
                                <MapPin className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex flex-col md:flex-row justify-between pt-8">
                        <button
                            type="submit"
                            className={`w-full md:w-1/3 bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center ${isSubmitting && 'opacity-50'} hover:bg-blue-900`}
                            disabled={isSubmitting}
                        >
                            <Save className="mr-2" />
                            {isSubmitting ? 'Enviando...' : 'Enviar'}
                        </button>
                        
                    </div>
                </form>
            </div>
        </>
    );
};

export default ReportEmergency;
