"use client";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { Home, Calendar } from "lucide-react";

// Example event data
const events = [
    {
        id: 1,
        title: "Distribuição de Alimentos",
        date: "05/10/2024",
        location: "Centro da Cidade",
        description: "Venha ajudar a distribuir refeições para pessoas em situação de rua."
    },
    {
        id: 2,
        title: "Ação de Saúde Comunitária",
        date: "12/10/2024",
        location: "Praça Central",
        description: "Ofereça assistência médica e exames básicos gratuitos para quem precisa."
    },
    {
        id: 3,
        title: "Doação de Roupas",
        date: "20/10/2024",
        location: "Centro Comunitário",
        description: "Ajude a distribuir roupas de inverno para moradores de rua."
    },
    {
        id: 4,
        title: "Campanha de Arrecadação de Cobertores",
        date: "01/11/2024",
        location: "Igreja do Bairro",
        description: "Participe da campanha para arrecadar cobertores e agasalhos para pessoas carentes."
    },
    {
        id: 5,
        title: "Distribuição de Kits de Higiene",
        date: "10/11/2024",
        location: "Rua Nova",
        description: "Ajude na entrega de kits de higiene pessoal para moradores de rua."
    },
    {
        id: 6,
        title: "Projeto Sopa Solidária",
        date: "15/11/2024",
        location: "Praça da Liberdade",
        description: "Distribuição de sopa e alimentos quentes para aqueles que mais precisam."
    },
    {
        id: 7,
        title: "Feira de Serviços Gratuitos",
        date: "20/11/2024",
        location: "Parque Central",
        description: "Assistência jurídica, corte de cabelo e outros serviços gratuitos para pessoas em situação de rua."
    },
    {
        id: 8,
        title: "Campanha de Doação de Brinquedos",
        date: "05/12/2024",
        location: "Centro Comunitário",
        description: "Doe brinquedos e ajude a fazer o Natal de crianças carentes mais feliz."
    },
    {
        id: 9,
        title: "Sessão de Cinema ao Ar Livre",
        date: "10/12/2024",
        location: "Praça da Alegria",
        description: "Uma sessão de cinema gratuita para pessoas em situação de rua."
    },
    {
        id: 10,
        title: "Dia de Beleza",
        date: "15/12/2024",
        location: "Centro de Assistência",
        description: "Corte de cabelo e serviços de beleza gratuitos para moradores de rua."
    },
    {
        id: 11,
        title: "Workshop de Reinserção Social",
        date: "10/01/2025",
        location: "Casa de Apoio",
        description: "Oficina para capacitar pessoas em situação de rua e ajudá-las a voltar ao mercado de trabalho."
    },
    {
        id: 12,
        title: "Doação de Livros",
        date: "15/01/2025",
        location: "Biblioteca Comunitária",
        description: "Doe livros para ajudar a promover a leitura entre as pessoas em situação de rua."
    }    
];

const Eventos = () => {
    const links = [
        { name: "Home", href: "/", icon: <Home className="h-6 w-6" /> },
        { name: "Eventos", href: "/eventos", icon: <Calendar className="h-6 w-6" /> },
    ];


    const [notifications, setNotifications] = useState(2);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <NavBar notifications={notifications} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} links={links} />
            <div className="container mx-auto px-4 py-8 bg-white pt-20">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Próximos Eventos</h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <div key={event.id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                            <h2 className="text-2xl font-bold mb-2 text-gray-800">{event.title}</h2>
                            <p className="text-gray-600 mb-1">
                                <strong>Data:</strong> {event.date}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <strong>Local:</strong> {event.location}
                            </p>
                            <p className="text-gray-600 mb-3">
                                {event.description}
                            </p>
                            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                                Participar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Eventos;
