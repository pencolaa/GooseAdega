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
      setPosicaoMesa({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setMesaSelecionada(id);
  };

  const setMesaRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) mesasRef.current[index] = el;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D0D] text-white px-4 py-6 relative">
      {/* Header */}
      <header className="flex flex-col items-center mb-8 relative">
        <Image
          src="/caponelogo.jpg"
          alt="Logo"
          width={80}
          height={80}
          className="mb-3 rounded-full shadow-[0_0_15px_#FF1E1E]"
        />
        <h1 className="text-3xl font-extrabold text-white tracking-wide uppercase">
          Mapa de Mesas
        </h1>

        {/* Botão Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute right-2 top-2 p-2 rounded-md hover:bg-red-600/30 transition"
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>

        {/* Menu dropdown */}
        {menuOpen && (
          <div className="absolute right-2 mt-14 w-44 bg-[#1A1A1A] border border-red-600 rounded-lg shadow-lg z-10">
            <ul className="flex flex-col text-white font-semibold">
              <li>
                <Link
                  href="/perfil"
                  className="block px-4 py-2 hover:bg-red-600/40 rounded-t-lg"
                >
                  Perfil
                </Link>
              </li>
              <li>
                <Link
                  href="/garcomPedido"
                  className="block px-4 py-2 hover:bg-red-600/40"
                >
                  Fazer Pedido
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="block px-4 py-2 hover:bg-red-600/40 rounded-b-lg"
                >
                  Sair
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Grid de Mesas */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-5 justify-items-center">
        {mesas.map((mesa, index) => (
          <div
            key={mesa.id}
            ref={setMesaRef(index)}
            className={`relative flex items-center justify-center w-20 h-20 rounded-full cursor-pointer font-bold text-sm text-white border-2 transition-all duration-300
              ${
                mesa.ocupada
                  ? "bg-red-700 border-red-500 shadow-[0_0_10px_#FF1E1E]"
                  : "bg-[#2B2B2B] border-gray-500 hover:border-white"
              } hover:scale-105`}
            onClick={() => handleClickMesa(mesa.id, index)}
          >
            {mesa.nome}
          </div>
        ))}
      </div>

      {/* Modal da mesa */}
      <AnimatePresence>
        {mesaAtual && (
          <motion.div
            key={mesaAtual.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-20 px-4"
          >
            <div className="bg-[#1A1A1A] border border-red-600 rounded-2xl p-6 w-full max-w-md shadow-[0_0_20px_#FF1E1E] text-white relative">
              <h2 className="text-2xl font-bold mb-3 text-center text-red-500 uppercase">
                {mesaAtual.nome}
              </h2>

              <p className="mb-1">Cliente: {mesaAtual.cliente || "—"}</p>
              <p className="mb-1">Telefone: {mesaAtual.telefone || "—"}</p>
              <p className="mb-3 font-semibold">
                Total: R$ {mesaAtual.consumo?.toFixed(2) || "0.00"}
              </p>

              <h3 className="text-lg font-semibold mb-2 text-red-500">
                Pedidos:
              </h3>
              <div className="bg-[#2B2B2B] rounded-md p-3 h-40 overflow-y-auto border border-red-800/40">
                {mesaAtual.produtos?.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {mesaAtual.produtos.map((p, i) => (
                      <li key={i}>
                        {p.nome} — R$ {p.preco.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm italic text-gray-300">
                    Nenhum pedido nesta mesa.
                  </p>
                )}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => {
                    liberarMesa(mesaAtual.id);
                    setMesaSelecionada(null);
                  }}
                  className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-600 font-semibold transition"
                >
                  Liberar Mesa
                </button>
                <button
                  onClick={() => setMesaSelecionada(null)}
                  className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300 font-semibold transition"
                >
                  Fechar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
