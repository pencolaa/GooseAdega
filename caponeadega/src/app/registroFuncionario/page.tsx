"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function RegistrarFuncionario() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [nome, setNome] = useState("");
  const router = useRouter();

  const menuItems = [
    { label: "Perfil", path: "/perfil" },
    { label: "Configurações", path: "/configuracoes" },
    { label: "Sair", path: "/sair" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/confirmacaoCadastro?nome=${encodeURIComponent(nome)}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative font-sans px-4 sm:px-6 md:px-10 lg:px-20 py-6">
      {/* Fundo escurecido */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/30 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

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

      {/* Cabeçalho */}
      <header className="flex flex-col items-center mb-10 relative z-20">
        {/* Menu sanduíche à esquerda */}
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

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mt-4 sm:mt-6"
        >
          <Image
            src="/caponelogo.jpg"
            alt="Logo da Loja"
            width={100}
            height={100}
            className="mb-3 rounded-full border-4 border-red-700 shadow-[0_0_25px_#ff000040]"
          />
          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 tracking-wide text-center"
            style={{ fontFamily: "'Mokoto', sans-serif" }}
          >
            Registrar Funcionário
          </h2>
        </motion.div>
      </header>

      {/* Formulário */}
      <motion.div
        className="flex flex-col gap-5 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto w-full relative z-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          {["nome", "email", "password", "cpf"].map((field, idx) => (
            <div key={idx}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-white"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {field === "nome"
                  ? "Nome"
                  : field === "email"
                  ? "E-mail"
                  : field === "password"
                  ? "Senha"
                  : "CPF"}
              </label>
              <input
                type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                id={field}
                name={field}
                value={field === "nome" ? nome : undefined}
                onChange={field === "nome" ? (e) => setNome(e.target.value) : undefined}
                required
                placeholder={`Digite o ${field}`}
                className="w-full mt-2 px-4 py-3 rounded-md bg-[#1c1c1c] border border-[#38331E] text-white placeholder-gray-400 focus:outline-none focus:bg-red-700/30 focus:ring-2 focus:ring-red-700 transition"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-md font-bold uppercase tracking-wide bg-[#ea3434] hover:bg-red-800 shadow-[0_0_10px_#ff000040] transition-all duration-300"
            style={{ fontFamily: "'Mokoto', sans-serif" }}
          >
            Registrar
          </button>
        </form>
      </motion.div>
    </div>
  );
}
