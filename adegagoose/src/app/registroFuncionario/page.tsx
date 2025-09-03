"use client";

import { useState } from "react";
import Image from "next/image";

export default function RegistrarFuncionario() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F4E6CE] px-4">
      <div className="w-full max-w-md p-8 bg-beige rounded-lg relative">
        {/* Menu Sanduíche */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute right-4 top-4 p-2 focus:outline-none"
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-[#38331E]"></span>
            <span className="block w-6 h-0.5 bg-[#38331E]"></span>
            <span className="block w-6 h-0.5 bg-[#38331E]"></span>
          </div>
        </button>

        {/* Menu Dropdown */}
        {menuOpen && (
          <div className="absolute right-4 top-14 w-40 bg-[#D8A865] rounded-lg shadow-lg z-10">
            <ul className="flex flex-col text-[#38331E]">
              <li className="px-4 py-2 hover:bg-[#c99e5e] cursor-pointer">Perfil</li>
              <li className="px-4 py-2 hover:bg-[#c99e5e] cursor-pointer">Configurações</li>
              <li className="px-4 py-2 hover:bg-[#c99e5e] cursor-pointer">Sair</li>
            </ul>
          </div>
        )}

        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <Image
            src="/ganso.png"
            alt="Logo da Loja"
            width={120}
            height={40}
            className="mx-auto"
          />
          <h2 className="mt-4 text-2xl font-semibold text-[#38331E]">
            Registrar Funcionário
          </h2>
        </div>

        {/* Formulário */}
        <form className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#38331E]">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Digite o e-mail"
              style={{ borderWidth: "3px", borderColor: "#38331E", color: "#38331E" }}
              className="w-full mt-2 px-4 py-3 rounded-md shadow-sm placeholder-[#38331E] focus:outline-none focus:ring-2 focus:ring-[#4B4729]"
            />
          </div>

          {/* Senha */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#38331E]">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Digite a senha"
              style={{ borderWidth: "3px", borderColor: "#38331E", color: "#38331E" }}
              className="w-full mt-2 px-4 py-3 rounded-md shadow-sm placeholder-[#38331E] focus:outline-none focus:ring-2 focus:ring-[#4B4729]"
            />
          </div>

          {/* CPF */}
          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-[#38331E]">
              CPF:
            </label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              required
              placeholder="Digite o CPF"
              style={{ borderWidth: "3px", borderColor: "#38331E", color: "#38331E" }}
              className="w-full mt-2 px-4 py-3 rounded-md shadow-sm placeholder-[#38331E] focus:outline-none focus:ring-2 focus:ring-[#4B4729]"
            />
          </div>

          {/* Botão Registrar */}
          <button
            type="submit"
            style={{ backgroundColor: "#38331E", color: "white" }}
            className="w-full py-3 mt-4 rounded-md font-semibold"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
