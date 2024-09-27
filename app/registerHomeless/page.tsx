"use client";
import React, { useState } from "react";
import { Camera, Upload, Trash } from "lucide-react";
import NavBar from "@/components/NavBar";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { Home, Calendar, MapPin, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomelessPersonForm = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [nickname, setNickname] = useState("");
    const [gender, setGender] = useState("");
    const [healthStatus, setHealthStatus] = useState("");
    const [lastLocation, setLastLocation] = useState('');
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica para enviar o formulário
        console.log("Formulário enviado com os dados:", {
            image,
            nickname,
            lastLocation,
            healthStatus,
            gender,
        });
    };

    return (
        <>
            <NavBar
                notifications={2}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                links={[
                    { name: "Home", href: "/", icon: <Home className="h-6 w-6" /> },
                    { name: "Eventos", href: "/eventos", icon: <Calendar className="h-6 w-6" /> },
                ]}
            />
            <div className="container mx-auto px-4 py-8 bg-white mt-20 flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
                <div className="w-full lg:w-1/3">
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        className="border-dashed border-2 border-gray-400 rounded-lg p-4 text-center h-full"
                    >
                        {preview ? (
                            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                            <div className="text-gray-500">
                                <p>Arraste uma imagem aqui (JPG, PNG, GIF)</p>
                                <p>ou</p>
                                <Button
                                    className="bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-900"
                                    onClick={() => document.getElementById('fileInput')?.click()}
                                >
                                    Escolha um arquivo...
                                </Button>
                                <input
                                    id="fileInput"
                                    type="file"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    accept="image/png, image/jpeg, image/gif"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between mt-4">
                        <Button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-900">
                            <Camera className="h-6 w-6" />
                            <p className="ml-2">Tirar foto</p>
                        </Button>
                        <Button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-900">
                            <Trash className="h-6 w-6" />
                            <p className="ml-2">Remover</p>
                        </Button>
                    </div>
                </div>

                <div className="w-full lg:w-2/3 bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Cadastro de Morador de Rua</h2>

                    {/* Nome Completo */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                        <input
                            type="text"
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
                            placeholder="Nome completo"
                        />
                    </div>

                    {/* Apelido (Opcional) */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Apelido (Opcional)</label>
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
                            placeholder="Apelido"
                        />
                    </div>

                    {/* Gênero */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Gênero</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        >
                            <option value="">Selecione o gênero</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>

                    {/* Estado de Saúde */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Estado de Saúde</label>
                        <textarea
                            value={healthStatus}
                            onChange={(e) => setHealthStatus(e.target.value)}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
                            rows={3}
                            placeholder="Descreva o estado de saúde do morador..."
                        />
                    </div>

                    {/* Localização */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Localização</label>
                        <div className="flex items-center space-x-2">
                            <LoadScript googleMapsApiKey={apiKey as string} libraries={['places']}>
                                <Autocomplete onLoad={(autocomplete) => setAutocomplete(autocomplete)} onPlaceChanged={() => {}}>
                                    <input
                                        type="text"
                                        value={lastLocation}
                                        onChange={(e) => setLastLocation(e.target.value)}
                                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
                                        placeholder="Digite a localização ou use o botão"
                                        required
                                    />
                                </Autocomplete>
                            </LoadScript>
                            <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-900">
                                <MapPin className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 w-full flex justify-center">
                <button
                    onClick={handleSubmit}
                    className="w-9/12 md:w-1/3 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-all flex items-center justify-center"
                >
                    <Save className="mr-2" />
                    Cadastrar
                </button>
            </div>
        </>
    );
}

export default HomelessPersonForm;
