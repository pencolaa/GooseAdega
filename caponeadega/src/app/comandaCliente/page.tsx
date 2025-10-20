"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  quantidade?: number;
}

export default function ComandaCliente() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [mesa, setMesa] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mesaCliente = localStorage.getItem("mesaCliente");
    if (!mesaCliente) {
      mesaCliente = "mesa-" + Math.floor(Math.random() * 10000);
      localStorage.setItem("mesaCliente", mesaCliente);
    }
    setMesa(mesaCliente);

    const updateComanda = () => {
      const todasComandas = JSON.parse(localStorage.getItem("comandas") || "{}");
      const comandaMesa: Produto[] = todasComandas[mesaCliente!] || [];
      setProdutos(comandaMesa.map((p) => ({ ...p, quantidade: p.quantidade || 1 })));
    };

    updateComanda();
    window.addEventListener("comandaUpdated", updateComanda);
    return () => window.removeEventListener("comandaUpdated", updateComanda);
  }, []);

  const total = produtos.reduce((acc, p) => {
    const preco = parseFloat(p.preco.replace("R$", "").replace(",", "."));
    return acc + preco * (p.quantidade || 1);
  }, 0);

  const menuItems = [{ label: "Cardápio", path: "/cardapio" }];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1c1c1c] to-black text-white relative font-sans px-4 sm:px-8 py-6 overflow-hidden">

      {/* Fundo escurecido */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-30"
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
            className="fixed top-0 left-0 h-full w-64 sm:w-72 bg-[#1a1a1a] border-r border-red-800 shadow-[0_0_25px_#ff000050] z-40 flex flex-col"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <ul className="flex flex-col mt-16 text-white font-medium">
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

      {/* Ícone do menu sanduíche */}
      <motion.button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 left-3 z-50 focus:outline-none"
        animate={{
          rotate: menuOpen ? 180 : 0,
          x: menuOpen ? 250 : 0, // movimento para fora
          filter: menuOpen
            ? "drop-shadow(0 0 10px #ff0000) brightness(1.5)"
            : "drop-shadow(0 0 0 transparent) brightness(1)",
          scale: menuOpen ? 1.15 : 1,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Image
          src="/iconeBranco.png"
          alt="Menu"
          width={35}
          height={35}
          className={`object-contain select-none transition-all duration-500 ${
            menuOpen ? "invert hue-rotate-15 saturate-200" : ""
          }`}
          priority
        />
      </motion.button>

      {/* Cabeçalho */}
      <header className="flex justify-center items-center mb-10 relative z-20">
        <Image
          src="/caponelogo.jpg"
          alt="Logo da Loja"
          width={100}
          height={100}
          className="rounded-full border-4 border-red-700 shadow-[0_0_20px_#ff000050]"
        />
      </header>

      {/* Conteúdo principal */}
      <motion.div
        className="flex flex-col items-center w-full relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className="text-3xl sm:text-4xl font-bold mb-8 tracking-wide text-center"
          style={{ fontFamily: "'Mokoto', sans-serif" }}
        >
          Comanda do Cliente
        </h1>

        {produtos.length === 0 ? (
          <p className="text-lg font-semibold text-gray-300 text-center">
            Nenhum produto foi adicionado ainda.
          </p>
        ) : (
          <div className="flex flex-col gap-4 w-full max-w-2xl">
            {produtos.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 p-4 border border-red-800 rounded-xl bg-[#1c1c1c] shadow-[0_0_10px_#ff000040]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Image
                  src={item.imagem}
                  alt={item.nome}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover border border-red-700"
                />
                <div className="flex flex-col justify-center flex-1">
                  <h2 className="font-semibold text-lg text-white">{item.nome}</h2>
                  <p className="text-sm text-gray-300">{item.descricao}</p>
                  <span className="text-sm font-bold text-red-500">{item.preco}</span>
                  <span className="text-sm text-gray-400 mt-1">
                    Quantidade: {item.quantidade}
                  </span>
                </div>
              </motion.div>
            ))}

            <div className="mt-6 p-4 border border-red-700 rounded-xl flex justify-between items-center bg-[#1c1c1c] shadow-[0_0_10px_#ff000050]">
              <span className="font-semibold text-lg">Total:</span>
              <span className="font-semibold text-lg text-red-500">
                R${total.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={() => router.push("/cardapio")}
          className="mt-8 underline font-semibold text-red-500 hover:text-red-700 transition-all duration-200"
        >
          Voltar ao Cardápio
        </button>
      </motion.div>
    </div>
  );
}
