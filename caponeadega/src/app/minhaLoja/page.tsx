"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function MinhaLoja() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const router = useRouter();

  const menuItems = [
    { label: "Perfil", path: "/perfil" },
    { label: "Configurações", path: "/configuracoes" },
    { label: "Mesas", path: "/mapaMesas" },
    { label: "Sair", path: "/sair" },
  ];

  // Detecta se está em desktop
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative font-serif overflow-hidden">
      {/* ÍCONE DO MENU */}
      <motion.button
        onClick={() => setMenuOpen(!menuOpen)}
        animate={{
          rotate: menuOpen ? 180 : 0,
          x: menuOpen ? (isDesktop ? 295 : 265) : 0,
          opacity: menuOpen ? 1 : 1, // agora sempre opaco
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed left-[3px] top-4 p-2 focus:outline-none z-30 sm:left-[5px] sm:top-6"
      >
        <motion.div
          animate={{
            filter: menuOpen
              ? "drop-shadow(0 0 10px #ff0000)"
              : "drop-shadow(0 0 4px #ffffff80)",
            opacity: menuOpen ? 1 : 1, // ícone vermelho totalmente opaco
          }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={menuOpen ? "/iconeVermelho.png" : "/iconeBranco.png"}
            alt="Menu"
            width={36}
            height={36}
            className="transition-all duration-300"
          />
        </motion.div>
      </motion.button>

      {/* CONTEÚDO PRINCIPAL */}
      <motion.div
        className="flex-1"
        animate={{ opacity: menuOpen ? 0.3 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <header className="flex flex-col items-center mb-10 relative z-10 px-4 sm:px-6 md:px-8">
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

        <motion.div className="flex flex-col gap-5 max-w-md mx-auto mt-8 w-full relative px-4 sm:px-0">
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

        <div className="absolute bottom-6 text-gray-500 italic text-sm tracking-widest text-center w-full z-10">
          “Negócios são negócios.”
        </div>
      </motion.div>

      {/* MENU LATERAL */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-0 left-0 h-full w-80 sm:w-72 bg-[#1a1a1a]/100 border-r border-red-800 shadow-[0_0_25px_#ff000050] z-20 flex flex-col backdrop-blur-sm"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }} // opacidade máxima quando aberto
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
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
