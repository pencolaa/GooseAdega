"use client";

import Image from "next/image";

export default function LoginCliente() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#F4E6CE] to-[#F4E6CE] px-4">
      <div className="w-full max-w-md p-8 bg-beige rounded-2xl ">
        {/* Cabeçalho */}
        <div className="text-center mb-10">
          <Image
            src="/ganso.png"
            alt="Logo do Cliente"
            width={120}
            height={40}
            className="mx-auto"
          />
          <h2 className="mt-4 text-3xl font-bold text-gray-800">
            Bem vindo a Goose Adega
          </h2>
        </div>

        {/* Formulário */}
        <form className="flex flex-col gap-6">
          {/* Input Nome */}
          <input
            type="text"
            placeholder="Digite seu nome"
            style={{
              borderWidth: "3px",
              borderColor: "#38331E",
              color: "#38331E",
            }}
            className="w-full px-5 py-4 rounded-xl placeholder-[#38331E] text-base focus:outline-none focus:ring-2 focus:ring-[#4B4729]"
          />

          {/* Input Mesa */}
          <input
            type="number"
            placeholder="Número da mesa"
            style={{
              borderWidth: "3px",
              borderColor: "#38331E",
              color: "#38331E",
            }}
            className="w-full px-5 py-4 rounded-xl placeholder-[#38331E] text-base focus:outline-none focus:ring-2 focus:ring-[#4B4729]"
          />

          {/* Input Telefone */}
          <input
            type="number"
            placeholder="Digite seu telefone"
            style={{
              borderWidth: "3px",
              borderColor: "#38331E",
              color: "#38331E",
            }}
            className="w-full px-5 py-4 rounded-xl placeholder-[#38331E] text-base focus:outline-none focus:ring-2 focus:ring-[#4B4729]"
          />

          {/* Botão Registrar */}
          <button
            style={{ backgroundColor: "#38331E", color: "white" }}
            className="w-full py-3 mt-4 rounded-md"
          >
            Abrir Comanda
          </button>
        </form>
      </div>
    </div>
  );
}
