"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginLoja() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/minhaLoja");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen text-white px-4"
      style={{ background: "#000000", fontFamily: "'Open Sans', sans-serif" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md p-8 rounded-xl bg-[#1c1c1c] shadow-[0_0_30px_#ffffff20]"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/caponelogo.jpg"
              alt="Logo da Loja"
              width={100}
              height={100}
              className="mx-auto rounded-full"
            />
          </motion.div>
          <h1
            className="mt-4 text-3xl font-bold tracking-wider text-white"
            style={{ fontFamily: "'Mokoto', sans-serif" }}
          >
            Login da Loja
          </h1>
          <p className="text-sm text-gray-400 italic mt-1">
            “Confiança é o verdadeiro poder.”
          </p>
        </div>

        {/* Formulário */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white mb-1"
            >
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Digite seu e-mail"
              className="w-full px-4 py-3 rounded-md text-white placeholder-gray-400 bg-[#2a2a2a]
                         focus:bg-[#f54242]outline-none transition-all duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-white mb-1"
            >
              Senha:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Digite sua senha"
              className="w-full px-4 py-3 rounded-md text-white placeholder-gray-400 bg-[#2a2a2a]
                         focus:bg-red-700/30 outline-none transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-md font-bold uppercase tracking-wide
                       bg-white text-black hover:bg-red-700 hover:text-white transition-all duration-300 
                       shadow-[0_0_15px_#ff000040]"
            style={{ fontFamily: "'Mokoto', sans-serif" }}
          >
            Entrar
          </button>
        </form>

        {/* Rodapé */}
        <div className="text-center text-gray-400 text-xs mt-8 italic">
          © 2025 El Capone Enterprises
        </div>
      </motion.div>
    </div>
  );
}
