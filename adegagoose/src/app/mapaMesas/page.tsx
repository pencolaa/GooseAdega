"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useMesas } from "../context/MesaContext";

export default function MapaMesas() {
  const { mesas, liberarMesa } = useMesas();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mesaSelecionada, setMesaSelecionada] = useState<number | null>(null);
  const [posicaoMesa, setPosicaoMesa] = useState({ x: 0, y: 0 });

  const mesasRef = useRef<(HTMLDivElement | null)[]>([]);
  const mesaAtual = mesas.find((m) => m.id === mesaSelecionada);

  const handleClickMesa = (id: number, index: number) => {
    const mesaDiv = mesasRef.current[index];
    if (mesaDiv) {
      const rect = mesaDiv.getBoundingClientRect();
      setPosicaoMesa({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
    setMesaSelecionada(id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F4E6CE] px-4 py-6 relative">
      {/* Cabeçalho */}
      <header className="flex flex-col items-center mb-8 relative">
        <Image src="/ganso.png" alt="Logo" width={50} height={50} className="mb-2" />
        <h1 className="text-2xl font-bold text-[#38331E] mb-2">Mapa de Mesas</h1>

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
              <li>
                <Link
                  href="/perfil"
                  className="block px-4 py-2 hover:bg-[#c99e5e] cursor-pointer"
                >
                  Perfil
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-[#c99e5e] cursor-pointer">
                Configurações
              </li>
              <li className="px-4 py-2 hover:bg-[#c99e5e] cursor-pointer">Sair</li>
            </ul>
          </div>
        )}
      </header>

      {/* Grid de Mesas */}
      <div className="grid grid-cols-5 gap-4 mb-6 justify-items-center">
        {mesas.map((mesa, index) => (
          <div
            key={mesa.id}
            ref={(el) => (mesasRef.current[index] = el)}
            className={`relative flex items-center justify-center w-20 h-20 rounded-full cursor-pointer transition
              ${mesa.ocupada ? "bg-red-600" : "bg-green-600"} 
              hover:scale-105 hover:shadow-lg`}
            onClick={() => handleClickMesa(mesa.id, index)}
          >
            <span className="text-white font-bold text-center">{mesa.nome}</span>
            {mesa.ocupada && (
              <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-yellow-400 border border-white"></span>
            )}
          </div>
        ))}
      </div>

      {/* Detalhes da Mesa */}
      <AnimatePresence>
        {mesaAtual && mesaAtual.ocupada && (
          <motion.div
            key={mesaAtual.id}
            initial={{
              scale: 0,
              opacity: 0,
              x: posicaoMesa.x - window.innerWidth / 2,
              y: posicaoMesa.y - 200,
            }}
            animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-[#D9AB67] rounded-lg p-4 max-w-md mx-auto text-[#38331E] shadow-lg absolute left-1/2 top-1/4 -translate-x-1/2"
          >
            <h2 className="text-xl font-bold mb-2">{mesaAtual.cliente}</h2>
            <p className="mb-1">Telefone: {mesaAtual.telefone}</p>
            <p className="mb-2 font-semibold">
              Total do pedido: R$ {mesaAtual.consumo?.toFixed(2) || "0.00"}
            </p>

            <ul className="list-disc list-inside">
              {mesaAtual.produtos.length > 0 ? (
                mesaAtual.produtos.map((produto, index) => (
                  <li key={index}>
                    {produto.nome} - R$ {produto.preco.toFixed(2)}
                  </li>
                ))
              ) : (
                <p>Nenhum pedido ainda.</p>
              )}
            </ul>

            <button
              onClick={() => {
                liberarMesa(mesaAtual.id);
                setMesaSelecionada(null);
              }}
              className="mt-4 bg-red-700 text-white py-2 px-4 rounded font-semibold hover:opacity-90 transition"
            >
              Liberar Mesa
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
