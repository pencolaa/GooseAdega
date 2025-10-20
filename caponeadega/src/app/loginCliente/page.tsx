"use client";

import { useState } from "react";
import { useMesas } from "../context/MesaContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginCliente() {
  const { mesas, ocuparMesa } = useMesas();
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mesaId, setMesaId] = useState<number | "">("");
  const router = useRouter();

  const handleLogin = () => {
    if (!nome || !telefone || !mesaId) return alert("Preencha todos os campos");
    ocuparMesa(Number(mesaId), nome, telefone);
    router.push("/cardapio");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4 font-serif">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 bg-[#1a1a1a] rounded-2xl shadow-[0_0_25px_#ff000040]"
      >
        {/* LOGO */}
        <div className="text-center mb-8">
          <Image
            src="/caponelogo.jpg"
            alt="Logo Goose Adega"
            width={80}
            height={80}
            className="mx-auto rounded-full shadow-[0_0_15px_#ff000040]"
          />
          <h2 className="mt-4 text-3xl font-bold text-white tracking-wide">
            Bem-vindo à Goose Adega
          </h2>
        </div>

        {/* FORMULÁRIO */}
        <form className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-black text-white placeholder-gray-400 focus:outline-none focus:border-2 focus:border-red-700 focus:ring-2 focus:ring-red-700 transition"
          />

          <select
            value={mesaId}
            onChange={(e) => setMesaId(Number(e.target.value))}
            className="w-full px-5 py-4 rounded-xl bg-black text-white placeholder-gray-400 focus:outline-none focus:border-2 focus:border-red-700 focus:ring-2 focus:ring-red-700 transition"
          >
            <option value="">-- Escolher mesa --</option>
            {mesas.map((mesa) => (
              <option key={mesa.id} value={mesa.id} disabled={mesa.ocupada}>
                {mesa.nome} {mesa.ocupada ? "(Ocupada)" : ""}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Digite seu telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-black text-white placeholder-gray-400 focus:outline-none focus:border-2 focus:border-red-700 focus:ring-2 focus:ring-red-700 transition"
          />

          <motion.button
            type="button"
            onClick={handleLogin}
            whileHover={{ scale: 1.03, boxShadow: "0 0 15px #ff0000" }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 mt-4 rounded-md bg-white text-black font-bold uppercase tracking-wide shadow-[0_0_10px_#ff000040] transition-all duration-300"
          >
            Abrir Comanda
          </motion.button>
        </form>

        {/* RODAPÉ */}
        <div className="mt-6 text-gray-500 italic text-sm tracking-widest text-center">
          “Negócios são negócios.”
        </div>
      </motion.div>
    </div>
  );
}
