"use client";

import { useState } from "react";
import { useMesas } from "../context/MesaContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#F4E6CE] to-[#F4E6CE] px-4">
      <div className="w-full max-w-md p-8 bg-[#F4E6CE] rounded-2xl shadow-md">
        {/* Cabeçalho */}
        <div className="text-center mb-10">
          <Image
            src="/ganso.png"
            alt="Logo do Cliente"
            width={120}
            height={40}
            className="mx-auto"
          />
          <h2 className="mt-4 text-3xl font-bold text-[#38331E]">
            Bem vindo à Goose Adega
          </h2>
        </div>

        {/* Formulário */}
        <form className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-5 py-4 rounded-xl border-2 border-[#38331E] text-[#38331E] placeholder-black focus:outline-none focus:ring-2 focus:ring-[#4B4729]"
          />

          <select
            value={mesaId}
            onChange={(e) => setMesaId(Number(e.target.value))}
            className="w-full px-5 py-4 rounded-xl border-2 border-[#38331E] text-[#38331E] placeholder-black focus:outline-none focus:ring-2 focus:ring-[#4B4729]"
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
            className="w-full px-5 py-4 rounded-xl border-2 border-[#38331E] text-[#38331E] placeholder-black focus:outline-none focus:ring-2 focus:ring-[#4B4729]"
          />

          <button
            type="button"
            onClick={handleLogin}
            className="w-full py-3 mt-4 rounded-md bg-[#38331E] text-white font-semibold hover:opacity-90 transition"
          >
            Abrir Comanda
          </button>
        </form>
      </div>
    </div>
  );
}
