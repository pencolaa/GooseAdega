"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white font-serif relative"
      style={{ background: "linear-gradient(to bottom, #1c1c1c, #000000)" }}
    >
      {/* Logo com borda vermelha elegante */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative flex items-center justify-center rounded-full p-2 border-4 border-red-700 shadow-[0_0_35px_#ff000060]">
          <Image
            src="/caponelogo.jpg"
            alt="El Capone Logo"
            width={200}
            height={200}
            className="rounded-full grayscale contrast-125 border-2 border-white shadow-[0_0_15px_#ffffff30]"
          />
        </div>
      </motion.div>

      {/* Botões */}
      <motion.div
        className="flex flex-col gap-6 w-64"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <button
          className="bg-white text-black py-3 rounded-md font-bold uppercase tracking-wide 
                     hover:bg-gray-200 transition-all duration-300 
                     border border-red-700 shadow-[0_0_10px_#ff000020]"
          onClick={() => router.push("/loginLoja")}
        >
          Minha loja
        </button>

        <button
          className="bg-black text-white py-3 rounded-md font-bold uppercase tracking-wide 
                     border-2 border-white hover:border-red-700 hover:text-red-700 
                     transition-all duration-300 shadow-[0_0_10px_#ffffff20]"
          onClick={() => router.push("/loginCliente")}
        >
          Sou cliente
        </button>
      </motion.div>

      {/* Rodapé */}
      <div className="absolute bottom-6 text-sm text-gray-400 italic tracking-widest">
        <span className="text-red-700">“</span>O negócio é pessoal<span className="text-red-700">.”</span>
      </div>
    </div>
  );
}
