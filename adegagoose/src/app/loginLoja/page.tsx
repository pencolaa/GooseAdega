"use client"; 

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginLoja() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // evita reload da página
    // Aqui você pode adicionar lógica de autenticação depois
    router.push("/minhaLoja"); // redireciona para a página minhaLoja
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#F4E6CE] to-[#F4E6CE] px-4">
      <div className="w-full max-w-md p-8 bg-beige rounded-lg">
        
        <div className="text-center mb-8">
          <Image
            src="/ganso.png"
            alt="Logo da Loja"
            width={120}
            height={40}
            className="mx-auto"
          />
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Digite seu e-mail"
              style={{
                borderWidth: "3px",
                borderColor: "#38331E",
                color: "#38331E",
              }}
              className="w-full mt-2 px-4 py-3 rounded-md shadow-sm placeholder-[#38331E] focus:outline-none focus:ring-2 focus:ring-[#4B4729]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Digite sua senha"
              style={{
                borderWidth: "3px",
                borderColor: "#38331E",
                color: "#38331E",
              }}
              className="w-full mt-2 px-4 py-3 rounded-md shadow-sm placeholder-[#38331E] focus:outline-none focus:ring-2 focus:ring-[#4B4729]"
            />
          </div>

          <button
            type="submit"
            style={{ backgroundColor: "#38331E", color: "white" }}
            className="w-full py-3 mt-4 rounded-md"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
