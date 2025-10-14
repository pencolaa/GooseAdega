"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

export default function CadastroFinalizado() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const nome = searchParams.get("nome") || "Funcionário";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1c1c1c] to-black px-4 sm:px-6 md:px-10 lg:px-20 text-white font-sans">
      
      {/* Logo redonda */}
      <div className="mb-8 flex justify-center">
        <Image
          src="/caponelogo.jpg"
          alt="Logo da Loja"
          width={150}
          height={150}
          className="rounded-full border-4 border-red-700 shadow-[0_0_25px_#ff000040]"
        />
      </div>

      {/* Mensagem de confirmação */}
      <h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2"
        style={{ fontFamily: "'Mokoto', sans-serif" }}
      >
        Cadastro Finalizado
      </h1>
      <p
        className="text-lg sm:text-xl md:text-2xl text-center mb-6"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        Bem-vindo ao time, {nome}!
      </p>

      {/* Botão Voltar */}
      <button
        onClick={() => router.push("/minhaLoja")}
        className="w-full sm:w-64 py-3 rounded-lg font-semibold bg-red-700 hover:bg-red-800 hover:shadow-[0_0_20px_#ff000060] transition-all duration-300"
        style={{ fontFamily: "'Mokoto', sans-serif" }}
      >
        Voltar
      </button>
    </div>
  );
}
