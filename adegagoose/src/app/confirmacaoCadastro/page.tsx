"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

export default function CadastroFinalizado() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const nome = searchParams.get("nome") || "Funcionário";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4E6CE] px-4">
      {/* Logo grande */}
      <Image
        src="/ganso.png"
        alt="Logo da Loja"
        width={200}
        height={200}
        className="mb-8"
      />

      {/* Mensagem de boas-vindas */}
      <h1 className="text-2xl font-bold text-[#38331E] text-center">
        Cadastro finalizado
      </h1>
      <p className="mt-2 text-lg text-[#38331E] text-center">
        Bem-vindo ao time, {nome}!
      </p>

      {/* Botão Voltar */}
      <button
        onClick={() => router.push("/minhaLoja")}
        style={{ backgroundColor: "#38331E", color: "white" }}
        className="mt-6 px-6 py-3 rounded-md font-semibold hover:opacity-90 transition"
      >
        Voltar
      </button>
    </div>
  );
}
