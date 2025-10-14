"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function MinhaLoja() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { label: "Perfil", path: "/perfil" },
    { label: "Configurações", path: "/configuracoes" },
    { label: "Mesas", path: "/mapaMesas" },
    { label: "Sair", path: "/sair" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative font-serif">
      {/* Conteúdo principal com opacidade quando o menu estiver aberto */}
      <motion.div
        className="flex-1"
        animate={{ opacity: menuOpen ? 0.3 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Cabeçalho */}
        <header className="flex flex-col items-center mb-10 relative z-10 px-4 sm:px-6 md:px-8">
          {/* Menu sanduíche */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="absolute left-4 top-4 p-2 focus:outline-none z-30 sm:left-6 sm:top-6"
          >
            <div className="flex flex-col space-y-1">
              <span className="block w-6 h-0.5 bg-red-700"></span>
              <span className="block w-4 h-0.5 bg-red-700"></span>
              <span className="block w-2 h-0.5 bg-red-700"></span>
            </div>
          </button>

          {/* Logo e título */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center mt-4 sm:mt-6"
          >
            <Image
              src="/caponelogo.jpg"
              alt="Logo El Capone"
              width={70}
              height={70}
              className="mb-3 rounded-full border-4 border-red-700 shadow-[0_0_25px_#ff000040]"
            />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-wide text-center">
              Minha Loja
            </h1>
          </motion.div>
        </header>

        {/* Botões principais */}
        <motion.div
          className="flex flex-col gap-5 max-w-md mx-auto mt-8 w-full relative px-4 sm:px-0"
        >
          <button
            onClick={() => router.push("/registroFuncionario")}
            className="w-full py-3 rounded-md font-bold uppercase tracking-wide
                       bg-[#ea3434] hover:bg-red-800 hover:shadow-[0_0_15px_#ff000080]
                       shadow-[0_0_10px_#ff000040] transition-all duration-300"
            style={{ fontFamily: "'Mokoto', sans-serif" }}
          >
            Registrar Funcionário
          </button>

          <button
            onClick={() => router.push("/meusProdutos")}
            className="w-full py-3 rounded-md font-bold uppercase tracking-wide
                       bg-white text-black hover:bg-gray-200 hover:shadow-[0_0_15px_#ffffff40]
                       transition-all duration-300"
          >
            Ver Meus Produtos
          </button>

          <button
            onClick={() => router.push("/garcomPedido")}
            className="w-full py-3 rounded-md font-bold uppercase tracking-wide
                       border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white
                       hover:shadow-[0_0_20px_#ff000060] transition-all duration-300"
          >
            Fazer Pedido
          </button>
        </motion.div>

        {/* Rodapé */}
        <div className="absolute bottom-6 text-gray-500 italic text-sm tracking-widest text-center w-full z-10">
          “Negócios são negócios.”
        </div>
      </motion.div>

      {/* Menu lateral */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-0 left-0 h-full w-64 sm:w-56 xs:w-48 bg-[#1a1a1a] border-r border-red-800 shadow-[0_0_25px_#ff000050] z-20 flex flex-col"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-end p-3">
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white text-xl font-bold focus:outline-none"
              >
                ←
              </button>
            </div>
            <ul className="flex flex-col mt-10 text-white font-medium">
              {menuItems.map((item, i) => (
                <li
                  key={i}
                  className="px-6 py-3 hover:bg-[#ea3434] cursor-pointer transition"
                  onClick={() => {
                    router.push(item.path);
                    setMenuOpen(false);
                  }}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
