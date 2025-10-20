"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  categoria: string;
  quantidade?: number;
}

const produtos: Produto[] = [
  { id: 1, nome: "Batatinha", descricao: "Batata frita com cheddar e bacon", preco: "R$18,50", imagem: "/batata-frita.jpg", categoria: "Porções" },
  { id: 2, nome: "Isca de peixe", descricao: "Isca de peixe com limão e molho rosé", preco: "R$22,00", imagem: "/iscas-de-peixe.jpg", categoria: "Porções" },
  { id: 3, nome: "Anéis de cebola", descricao: "Anéis crocantes com molho especial", preco: "R$16,00", imagem: "/aneis-de-cebola.jpg", categoria: "Porções" },
  { id: 4, nome: "Caipirinha", descricao: "Cachaça, limão e açúcar", preco: "R$15,00", imagem: "/caipirinha.jpg", categoria: "Bebidas/Drinks" },
  { id: 5, nome: "Mojito", descricao: "Rum, hortelã e limão", preco: "R$17,00", imagem: "/mojito.jpg", categoria: "Bebidas/Drinks" },
  { id: 6, nome: "Gin Tônica", descricao: "Gin com água tônica e limão siciliano", preco: "R$19,00", imagem: "/gin-tonica.jpg", categoria: "Bebidas/Drinks" },
  { id: 7, nome: "Narguile Maçã Dupla", descricao: "Essência de maçã dupla tradicional", preco: "R$40,00", imagem: "/narguile-maca.jpg", categoria: "Narguiles" },
  { id: 8, nome: "Narguile Uva", descricao: "Essência de uva gelada", preco: "R$40,00", imagem: "/narguile-uva.jpg", categoria: "Narguiles" },
  { id: 9, nome: "Narguile Melancia", descricao: "Essência refrescante de melancia", preco: "R$40,00", imagem: "/narguile-melancia.jpg", categoria: "Narguiles" },
  { id: 10, nome: "Heineken", descricao: "Long neck 330ml", preco: "R$12,00", imagem: "/heineken.jpg", categoria: "Cervejas" },
  { id: 11, nome: "Brahma Duplo Malte", descricao: "Lata 350ml", preco: "R$9,00", imagem: "/brahma.jpg", categoria: "Cervejas" },
  { id: 12, nome: "Corona", descricao: "Garrafa 355ml com limão", preco: "R$13,00", imagem: "/corona.jpg", categoria: "Cervejas" },
];

export default function Cardapio() {
  const [comandaCount, setComandaCount] = useState(0);
  const [categoriaAtiva, setCategoriaAtiva] = useState("Ver tudo");
  const [mesaAtiva, setMesaAtiva] = useState<string>("");
  const [confirmProduto, setConfirmProduto] = useState<Produto | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mesa = localStorage.getItem("mesaCliente");
    if (!mesa) {
      mesa = "mesa-" + Math.floor(Math.random() * 10000);
      localStorage.setItem("mesaCliente", mesa);
    }
    setMesaAtiva(mesa);
  }, []);

  useEffect(() => {
    const updateComandaCount = () => {
      if (!mesaAtiva) return;
      const todasComandas = JSON.parse(localStorage.getItem("comandas") || "{}");
      const comandaMesa = todasComandas[mesaAtiva] || [];
      const totalItems = comandaMesa.reduce((acc: number, item: Produto) => acc + (item.quantidade || 1), 0);
      setComandaCount(totalItems);
    };
    updateComandaCount();
    window.addEventListener("comandaUpdated", updateComandaCount);
    return () => window.removeEventListener("comandaUpdated", updateComandaCount);
  }, [mesaAtiva]);

  const handleAddProduct = (produto: Produto) => setConfirmProduto(produto);

  const confirmAddProduct = (produto: Produto) => {
    if (!mesaAtiva) return;
    const todasComandas = JSON.parse(localStorage.getItem("comandas") || "{}");
    const comandaMesa = todasComandas[mesaAtiva] || [];

    const index = comandaMesa.findIndex((p: Produto) => p.id === produto.id);
    if (index !== -1) comandaMesa[index].quantidade = (comandaMesa[index].quantidade || 1) + 1;
    else comandaMesa.push({ ...produto, quantidade: 1 });

    todasComandas[mesaAtiva] = comandaMesa;
    localStorage.setItem("comandas", JSON.stringify(todasComandas));
    window.dispatchEvent(new Event("comandaUpdated"));
    setConfirmProduto(null);
  };

  const categorias = ["Ver tudo", ...Array.from(new Set(produtos.map(p => p.categoria)))];
  const produtosFiltrados = categoriaAtiva === "Ver tudo" ? produtos : produtos.filter(p => p.categoria === categoriaAtiva);

  const produtosAgrupados = produtos.reduce((acc: Record<string, Produto[]>, produto) => {
    if (!acc[produto.categoria]) acc[produto.categoria] = [];
    acc[produto.categoria].push(produto);
    return acc;
  }, {});

  return (
    <main className="min-h-screen w-full flex flex-col items-center p-6 bg-black font-serif relative">
      {/* HEADER */}
      <header className="w-full flex justify-end items-center mb-6 relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`relative transition-transform duration-500 ${menuOpen ? "rotate-180" : "rotate-0"}`}
        >
          <Image
            src={menuOpen ? "/iconeVermelho.png" : "/iconeBranco.png"}
            alt="Menu"
            width={40}
            height={40}
            className="transition-all duration-500"
          />
        </button>

        {menuOpen && (
          <div className="absolute top-12 right-0 w-56 bg-[#1a1a1a] rounded-md shadow-lg z-50 transition-all duration-500 animate-slide-in">
            <div className="px-4 py-2 font-bold text-white border-b border-red-700">CATEGORIAS</div>
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => { setCategoriaAtiva(cat); setMenuOpen(false); }}
                className={`w-full text-left px-4 py-2 text-white hover:bg-red-700 transition ${
                  categoriaAtiva === cat ? "font-bold underline text-white" : "text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* PRODUTOS */}
      <div className="w-full flex flex-col gap-6">
        {categoriaAtiva === "Ver tudo" ? (
          Object.keys(produtosAgrupados).map((categoria) => (
            <div key={categoria} className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-3">{categoria.toUpperCase()}</h2>
              <div className="flex flex-col gap-4">
                {produtosAgrupados[categoria].map(item => (
                  <ProdutoCard key={item.id} item={item} handleAddProduct={handleAddProduct} />
                ))}
              </div>
            </div>
          ))
        ) : (
          produtosFiltrados.map(item => (
            <ProdutoCard key={item.id} item={item} handleAddProduct={handleAddProduct} />
          ))
        )}
      </div>

      {/* BOTÃO COMANDA */}
      <button
        className="fixed bottom-6 bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-[0_0_15px_#ff000040] hover:shadow-[0_0_25px_#ff000060] transition-all"
        onClick={() => router.push(`/comandaCliente?mesa=${mesaAtiva}`)}
      >
        Minha Comanda <span className="ml-2 bg-black text-white px-2 py-1 rounded-full text-sm">{comandaCount}</span>
      </button>

      {/* POP-UP */}
      {confirmProduto && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-[0_0_25px_#ff000040] flex flex-col items-center gap-4 animate-popup">
            <span className="font-bold text-white text-lg">Deseja adicionar este produto?</span>
            <span className="text-red-700 font-semibold">{confirmProduto.nome}</span>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => confirmAddProduct(confirmProduto)}
                className="bg-red-700 text-white px-4 py-2 rounded-xl font-bold hover:shadow-[0_0_15px_#ff0000]"
              >
                Sim
              </button>
              <button
                onClick={() => setConfirmProduto(null)}
                className="bg-gray-800 text-white px-4 py-2 rounded-xl font-bold hover:brightness-110"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-popup {
          animation: popupAnim 0.3s ease forwards;
        }
        @keyframes popupAnim {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease forwards;
        }
        @keyframes slideIn {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </main>
  );
}

function ProdutoCard({ item, handleAddProduct }: { item: Produto; handleAddProduct: (p: Produto) => void }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#1a1a1a] w-full h-28 hover:bg-[#2a2a2a] transition">
      <div className="relative">
        <Image src={item.imagem} alt={item.nome} width={80} height={80} className="rounded-lg" />
        <button
          className="absolute bottom-0 right-0 bg-red-700 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shadow-md hover:shadow-[0_0_10px_#ff0000] active:scale-90 transition-transform duration-150"
          onClick={() => handleAddProduct(item)}
        >
          +
        </button>
      </div>
      <div className="flex flex-col justify-center flex-1">
        <h3 className="font-bold text-white text-lg">{item.nome}</h3>
        <p className="text-sm text-gray-300">{item.descricao}</p>
        <span className="text-sm font-bold text-red-700">{item.preco}</span>
      </div>
    </div>
  );
}
