// src/app/meusProdutos/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

export default function MeusProdutos() {
  const [menuOpen, setMenuOpen] = useState(false);

  const produtos = [
    {
      id: 1,
      nome: "Cerveja Heineken 600ml",
      preco: "R$ 12,90",
      imagem: "/heineken.jpg",
    },
    {
      id: 2,
      nome: "Vodka Absolut 1L",
      preco: "R$ 89,90",
      imagem: "/vodkaAbsolut.jpg",
    },
    {
      id: 3,
      nome: "Whisky Johnnie Walker Red",
      preco: "R$ 119,90",
      imagem: "/johnnie.jpg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F4E6CE] px-4 py-6 relative">
      {/* Cabeçalho */}
      <header className="flex flex-col items-center mb-8 relative">
        {/* Logo */}
        <Image src="/ganso.png" alt="Logo" width={50} height={50} className="mb-2" />

        {/* Título */}
        <h1 className="text-2xl font-bold text-[#38331E] mb-2">Meus Produtos</h1>

        {/* Menu Sanduíche */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute right-0 top-0 p-2 focus:outline-none"
        >
          {/* Ícone simples de sanduíche */}
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-[#38331E]"></span>
            <span className="block w-6 h-0.5 bg-[#38331E]"></span>
            <span className="block w-6 h-0.5 bg-[#38331E]"></span>
          </div>
        </button>

        {/* Menu Dropdown */}
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

      {/* Lista de produtos */}
      <div className="grid grid-cols-1 gap-4 flex-1">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="flex items-center justify-between bg-[#F4E6CE] border border-[#D9AB67] rounded-lg p-4"
          >
            {/* Imagem + informações */}
            <div className="flex items-center gap-4">
              <Image
                src={produto.imagem}
                alt={produto.nome}
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-[#38331E]">{produto.nome}</h2>
                <p className="text-[#38331E]">{produto.preco}</p>
              </div>
            </div>

            {/* Botão Editar */}
            <button
              className="px-4 py-2 rounded-md hover:opacity-80"
              style={{ backgroundColor: "#38331E", color: "white" }}
            >
              Editar
            </button>
          </div>
        ))}
      </div>

      {/* Botão adicionar produto */}
      <div className="mt-8">
        <button
          className="w-full py-3 font-semibold rounded-lg hover:opacity-80"
          style={{ backgroundColor: "#38331E", color: "white" }}
        >
          + Adicionar Produto
        </button>
      </div>
    </div>
  );
}
