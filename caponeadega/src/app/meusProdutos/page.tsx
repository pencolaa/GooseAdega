"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Produto {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
  quantidade: number;
}

export default function MeusProdutos() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    preco: "",
    imagem: "",
    quantidade: 1,
  });

  const router = useRouter();

  const [produtos, setProdutos] = useState<Produto[]>([
    { id: 1, nome: "Cerveja Heineken 600ml", preco: "R$ 12,90", imagem: "/heineken.jpg", quantidade: 1 },
    { id: 2, nome: "Vodka Absolut 1L", preco: "R$ 89,90", imagem: "/vodkaAbsolut.jpg", quantidade: 1 },
    { id: 3, nome: "Whisky Johnnie Walker Red", preco: "R$ 119,90", imagem: "/johnnie.jpg", quantidade: 1 },
  ]);

  const menuItems = [
    { label: "Perfil", path: "/perfil" },
    { label: "Configurações", path: "/configuracoes" },
    { label: "Mesas", path: "/mapaMesas" },
    { label: "Sair", path: "/sair" },
  ];

  const editarProduto = (id: number) => {
    const produto = produtos.find((p) => p.id === id);
    if (!produto) return;

    const novoNome = prompt("Digite o novo nome do produto:", produto.nome);
    if (!novoNome) return;

    const novoPreco = prompt("Digite o novo preço do produto:", produto.preco);
    if (!novoPreco) return;

    setProdutos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, nome: novoNome, preco: novoPreco } : p))
    );
  };

  const removerProduto = (id: number) => {
    if (confirm("Tem certeza que deseja remover este produto?")) {
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const incrementar = (id: number) => {
    setProdutos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantidade: p.quantidade + 1 } : p))
    );
  };

  const decrementar = (id: number) => {
    setProdutos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantidade: Math.max(1, p.quantidade - 1) } : p
      )
    );
  };

  const handleAdicionarProduto = () => {
    if (!novoProduto.nome || !novoProduto.preco) return;

    const produto: Produto = {
      id: produtos.length ? produtos[produtos.length - 1].id + 1 : 1,
      ...novoProduto,
    };

    setProdutos((prev) => [...prev, produto]);
    setNovoProduto({ nome: "", preco: "", imagem: "", quantidade: 1 });
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1c1c1c] to-black text-white relative font-serif">
      {/* Conteúdo principal */}
      <motion.div
        className="flex-1"
        animate={{ opacity: menuOpen || modalOpen ? 0.3 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Cabeçalho */}
        <header className="flex flex-col items-center mb-10 relative px-4 sm:px-6 md:px-8">
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
              alt="Logo El Capone"
              width={70}
              height={70}
              className="mb-3 rounded-full border-4 border-red-700 shadow-[0_0_25px_#ff000040]"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-wide text-center">
              Meus Produtos
            </h1>
          </motion.div>
        </header>

        {/* Lista de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 sm:px-10 mb-16">
          {produtos.map((produto) => (
            <motion.div
              key={produto.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-[#1a1a1a] border border-red-800 rounded-xl p-4 shadow-[0_0_15px_#ff000020] hover:shadow-[0_0_25px_#ff000040] transition-all"
            >
              <div className="flex flex-col items-center gap-3">
                <Image
                  src={produto.imagem || "/default.jpg"}
                  alt={produto.nome}
                  width={100}
                  height={100}
                  className="rounded-lg border border-red-700 object-cover"
                />
                <div className="text-center">
                  <h2 className="text-lg font-semibold">{produto.nome}</h2>
                  <p className="text-red-600 font-medium">{produto.preco}</p>
                </div>

                {/* Controles de quantidade */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decrementar(produto.id)}
                    className="px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 transition"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 bg-[#2a2a2a] rounded-md">{produto.quantidade}</span>
                  <button
                    onClick={() => incrementar(produto.id)}
                    className="px-3 py-1 rounded-md bg-red-700 hover:bg-red-800 transition"
                  >
                    +
                  </button>
                </div>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => editarProduto(produto.id)}
                    className="px-4 py-2 rounded-md bg-red-700 hover:bg-red-800 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => removerProduto(produto.id)}
                    className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botão abrir modal */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => setModalOpen(true)}
            className="w-[90%] sm:w-[60%] md:w-[40%] py-3 font-semibold rounded-lg 
                     bg-red-700 hover:bg-red-800 hover:shadow-[0_0_20px_#ff000060] transition-all duration-300"
          >
            + Adicionar Produto
          </button>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#1a1a1a] p-6 rounded-xl w-[90%] sm:w-96 shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4 text-center">Novo Produto</h2>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Nome"
                  value={novoProduto.nome}
                  onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-[#2a2a2a] text-white focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Preço"
                  value={novoProduto.preco}
                  onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-[#2a2a2a] text-white focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Caminho da imagem"
                  value={novoProduto.imagem}
                  onChange={(e) => setNovoProduto({ ...novoProduto, imagem: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-[#2a2a2a] text-white focus:outline-none"
                />
                <div className="flex items-center gap-2">
                  <span className="text-white">Quantidade:</span>
                  <button
                    onClick={() => setNovoProduto((prev) => ({ ...prev, quantidade: Math.max(1, prev.quantidade - 1) }))}
                    className="px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 transition"
                  >-</button>
                  <span className="px-3 py-1 bg-[#2a2a2a] rounded-md">{novoProduto.quantidade}</span>
                  <button
                    onClick={() => setNovoProduto((prev) => ({ ...prev, quantidade: prev.quantidade + 1 }))}
                    className="px-3 py-1 rounded-md bg-red-700 hover:bg-red-800 transition"
                  >+</button>
                </div>
                <div className="flex gap-3 mt-4 justify-end">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAdicionarProduto}
                    className="px-4 py-2 rounded-md bg-red-700 hover:bg-red-800 transition"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
