"use client";
import React, { useState } from "react";
import { Save, User, Key } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Calendar } from 'lucide-react';
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Camera, Trash } from 'lucide-react';

// Exemplo de perfil de usuário
const userProfile = {
    name: "Gabriel Matta",
    cpf: "123.456.789-00",
    refCode: null,
    username: "Toninho Matta",
    email: "EstevesMatta@example.com",
    profilePicture: "/public/Images/Matta.jpg"
};

const UserProfileEdit = () => {
    const [user, setUser] = useState(userProfile);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const links = [
        { name: "Home", href: "/", icon: <Home className="h-6 w-6" /> },
        { name: "Eventos", href: "/eventos", icon: <Calendar className="h-6 w-6" /> },
    ];

    const [notifications, setNotifications] = useState(2);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSave = () => {
        // Lógica para salvar as alterações (ex: enviar dados ao backend)
        console.log("Dados salvos:", user);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Formulário enviado com os dados:", {
            image,
        });
    };

    const handleTakePhoto = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    console.log("Câmera acessada com sucesso");
                })
                .catch((error) => {
                    console.error("Erro ao acessar a câmera: ", error);
                });
        } else {
            alert("Acesso à câmera não disponível neste dispositivo.");
        }
    };

    const handleRemoveImage = () => {
        setImage(null); // Remove a imagem da pré-visualização
        setPreview(null); // Reseta o arquivo de imagem enviado
    };

    return (
        <>
            <NavBar notifications={notifications} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} links={links} />
            <div className="container mx-auto px-4 py-8 bg-white pt-20">
                {/* Título da Página */}
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Editar Perfil</h1>

                <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-8">
                    {/* Área de avatar */}
                    <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
                        <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            className="border-dashed border-2 border-gray-400 rounded-lg p-4 text-center"
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
                                        id="fileInput"  // Dê um ID único para ser usado no clique
                                        type="file"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        accept="image/png, image/jpeg, image/gif"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between mt-4">
                            <Button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-900" onClick={handleTakePhoto}>
                                <Camera className="h-6 w-6" />
                                <p className="ml-2">Tirar foto</p>
                            </Button>
                            <Button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-900" onClick={handleRemoveImage}>
                                <Trash className="h-6 w-6" />
                                <p className="ml-2">Remover</p>
                            </Button>
                        </div>
                    </div>

                    {/* Formulário de Edição */}
                    <div className="w-full lg:w-2/3 bg-gray-200 p-6 rounded-lg shadow-lg">
                        {/* Campo de Nome */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Nome</label>
                            <input
                                type="text"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                        </div>

                        {/* Campo de CPF */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">CPF</label>
                            <input
                                type="text"
                                value={user.cpf}
                                onChange={(e) => setUser({ ...user, cpf: e.target.value })}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                        </div>

                        {/* Nome de Usuário */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Usuário</label>
                            <input
                                type="text"
                                value={user.username}
                                disabled
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm bg-gray-200 cursor-not-allowed"
                            />
                        </div>

                        {/* Campo de Email */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">E-mail</label>
                            <input
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                        </div>

                        {/* Campos de Senha */}
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                            <div className="w-full md:w-1/2">
                                <label className="block text-sm font-medium text-gray-700">Senha</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
                                />
                            </div>
                            <div className="w-full md:w-1/2">
                                <label className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Botão de Salvar */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={handleSave}
                                className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-all flex items-center justify-center"
                            >
                                <Save className="mr-2" />
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfileEdit;
