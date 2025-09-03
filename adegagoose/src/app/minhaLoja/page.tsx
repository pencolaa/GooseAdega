"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MinhaLoja() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-[#F4E6CE] px-4 py-6 relative">
     
      <header className="flex flex-col items-center mb-8 relative">
        
        <Image src="/ganso.png" alt="Logo" width={50} height={50} className="mb-2" />

        
        <h1 className="text-2xl font-bold text-[#38331E] mb-2">Minha Loja</h1>

        
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute right-0 top-0 p-2 focus:outline-none"
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-[#38331E]"></span>
            <span className="block w-6 h-0.5 bg-[#38331E]"></span>
            <span className="block w-6 h-0.5 bg-[#38331E]"></span>
          </div>
        </button>

        
        {menuOpen && (
          <div className="absolute right-0 mt-12 w-40 bg-[#D8A865] rounded-lg shadow-lg z-10">
            <ul className="flex flex-col text-[#38331E]">
              <li className="px-4 py-2 hover:bg-[#c99e5e] cursor-pointer">Perfil</li>
              <li className="px-4 py-2 hover:bg-[#c99e5e] cursor-pointer">Configurações</li>
              <li className="px-4 py-2 hover:bg-[#c99e5e] cursor-pointer">Sair</li>
            </ul>
          </div>
        )}
      </header>

      
      <div className="flex flex-col gap-4 max-w-md mx-auto mt-8 w-full">
        <button
          onClick={() => router.push("/registroFuncionario")}
          className="w-full py-3 rounded-md font-semibold hover:opacity-90 transition"
          style={{ backgroundColor: "#38331E", color: "white" }}
        >
          Registrar Funcionário
        </button>

        <button
          onClick={() => router.push("/meusProdutos")}
          className="w-full py-3 rounded-md font-semibold hover:opacity-90 transition"
          style={{ backgroundColor: "#38331E", color: "white" }}
        >
          Ver Meus Produtos
        </button>
      </div>
    </div>
  );
}
