"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
}

export default function PerfilRestaurante() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Perfil do chefe
  const chefe = {
    nome: "Carlos Silva",
    cargo: "Gerente do Restaurante",
    imagem: "/chefe.jpg",
  };

  // Lista de funcionários
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([
    { id: 1, nome: "João", cargo: "Garçom" },
    { id: 2, nome: "Maria", cargo: "Cozinheira" },
    { id: 3, nome: "Pedro", cargo: "Caixa" },
  ]);

  const menuItems = [
    { label: "Perfil", path: "/perfil" },
    { label: "Configurações", path: "/configuracoes" },
    { label: "Mesas", path: "/mapaMesas" },
    { label: "Sair", path: "/sair" },
  ];

  const editarFuncionario = (id: number) => {
    const funcionario = funcionarios.find((f) => f.id === id);
    if (!funcionario) return;

    const novoNome = prompt("Digite o novo nome do funcionário:", funcionario.nome);
    if (!novoNome) return;

    const novoCargo = prompt("Digite o novo cargo do funcionário:", funcionario.cargo);
    if (!novoCargo) return;

    setFuncionarios((prev) =>
      prev.map((f) => (f.id === id ? { ...f, nome: novoNome, cargo: novoCargo } : f))
    );
  };

  const removerFuncionario = (id: number) => {
    if (confirm("Deseja realmente remover este funcionário?")) {
      setFuncionarios((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const adicionarFuncionario = () => {
    const nome = prompt("Digite o nome do novo funcionário:");
    if (!nome) return;

    const cargo = prompt("Digite o cargo do novo funcionário:");
    if (!cargo) return;

    const novoFuncionario: Funcionario = {
      id: funcionarios.length ? funcionarios[funcionarios.length - 1].id + 1 : 1,
      nome,
      cargo,
    };

    setFuncionarios((prev) => [...prev, novoFuncionario]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1c1c1c] to-black text-white relative font-serif">
      {/* Conteúdo principal com opacidade quando o menu estiver aberto */}
      <motion.div
        className="flex-1 px-4 sm:px-6 md:px-8"
        animate={{ opacity: menuOpen ? 0.3 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Cabeçalho */}
        <header className="flex flex-col items-center mb-10 relative mt-4 sm:mt-6">
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
            className="flex flex-col items-center"
          >
            <Image
              src="/caponelogo.jpg"
              alt="Logo El Capone"
              width={70}
              height={70}
              className="mb-3 rounded-full border-4 border-red-700 shadow-[0_0_25px_#ff000040]"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-wide text-center">
              Perfil do Restaurante
            </h1>
          </motion.div>
        </header>

        {/* Perfil do Chefe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-8 bg-[#1a1a1a] p-6 rounded-xl shadow-[0_0_15px_#ff000020]"
        >
          <Image
            src={chefe.imagem}
            alt={chefe.nome}
            width={100}
            height={100}
            className="rounded-full mb-4 border-2 border-red-700"
          />
          <h2 className="text-2xl font-bold text-white">{chefe.nome}</h2>
          <p className="text-red-600">{chefe.cargo}</p>
        </motion.div>

        {/* Botão adicionar funcionário */}
        <div className="mb-4 flex justify-center">
          <button
            onClick={adicionarFuncionario}
            className="w-[90%] sm:w-[60%] md:w-[40%] py-3 font-semibold rounded-lg 
                       bg-red-700 hover:bg-red-800 hover:shadow-[0_0_20px_#ff000060] transition-all duration-300"
          >
            + Adicionar Funcionário
          </button>
        </div>

        {/* Lista de funcionários */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {funcionarios.map((funcionario) => (
            <motion.div
              key={funcionario.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-[#1a1a1a] border border-red-800 rounded-xl p-4 shadow-[0_0_15px_#ff000020] hover:shadow-[0_0_25px_#ff000040] transition-all"
            >
              <div className="flex flex-col items-center gap-3">
                <h3 className="text-lg font-semibold text-white">{funcionario.nome}</h3>
                <p className="text-red-600">{funcionario.cargo}</p>
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => editarFuncionario(funcionario.id)}
                    className="px-4 py-2 rounded-md bg-red-700 hover:bg-red-800 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => removerFuncionario(funcionario.id)}
                    className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Menu lateral */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-0 left-0 h-full w-64 sm:w-56 bg-[#1a1a1a] border-r border-red-800 shadow-[0_0_25px_#ff000050] z-20 flex flex-col"
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
