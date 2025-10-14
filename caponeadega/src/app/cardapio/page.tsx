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
  const [confirmProduto, setConfirmProduto] = useState<Produto | null>(null); // produto para confirmação
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

  const handleAddProduct = (produto: Produto) => {
    setConfirmProduto(produto); // mostra pop-up de confirmação
  };

  const confirmAddProduct = (produto: Produto) => {
    if (!mesaAtiva) return;
    const todasComandas = JSON.parse(localStorage.getItem("comandas") || "{}");
    const comandaMesa = todasComandas[mesaAtiva] || [];

    const index = comandaMesa.findIndex((p: Produto) => p.id === produto.id);
    if (index !== -1) {
      comandaMesa[index].quantidade = (comandaMesa[index].quantidade || 1) + 1;
    } else {
      comandaMesa.push({ ...produto, quantidade: 1 });
    }

    todasComandas[mesaAtiva] = comandaMesa;
    localStorage.setItem("comandas", JSON.stringify(todasComandas));
    window.dispatchEvent(new Event("comandaUpdated"));
    setConfirmProduto(null);
  };

  const categorias = ["Ver tudo", ...Array.from(new Set(produtos.map((p) => p.categoria)))];
  const produtosFiltrados = categoriaAtiva === "Ver tudo" ? produtos : produtos.filter(p => p.categoria === categoriaAtiva);

  return (
    <main className="min-h-screen w-full flex flex-col items-center p-6 bg-[#F4E6CE]">
      <header className="w-full flex justify-between items-center mb-6 relative">
        <Image src="/ganso.png" alt="Logo Goose" width={80} height={80} />
        {/* Menu sanduíche */}
        <div className="relative">
          <button className="text-3xl font-bold text-black" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10" style={{ backgroundColor: "#D8A865" }}>
              <div className="px-4 py-2 font-bold text-black rounded-t-md">CATEGORIAS</div>
              <hr className="border-gray-400" />
              {categorias.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setCategoriaAtiva(cat); setMenuOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-black hover:brightness-90 ${categoriaAtiva === cat ? "font-bold underline" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="w-full flex flex-col gap-4">
        {produtosFiltrados.map(item => (
          <ProdutoCard key={item.id} item={item} handleAddProduct={handleAddProduct} />
        ))}
      </div>

      <button
        className="fixed bottom-6 bg-[#3b2f2f] text-white font-bold py-3 px-6 rounded-xl shadow-md"
        onClick={() => router.push(`/comandaCliente?mesa=${mesaAtiva}`)}
      >
        Minha Comanda <span className="ml-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm">{comandaCount}</span>
      </button>

      {/* Pop-up de confirmação */}
      {confirmProduto && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="bg-[#F4E6CE] p-6 rounded-xl shadow-xl flex flex-col items-center gap-4 pointer-events-auto animate-popup">
            <span className="font-bold text-black">Deseja adicionar este produto?</span>
            <span className="text-sm text-black">{confirmProduto.nome}</span>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => confirmAddProduct(confirmProduto)}
                className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold hover:brightness-90"
              >
                Sim
              </button>
              <button
                onClick={() => setConfirmProduto(null)}
                className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold hover:brightness-90"
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
      `}</style>
    </main>
  );
}

function ProdutoCard({ item, handleAddProduct }: { item: Produto; handleAddProduct: (p: Produto) => void }) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-xl bg-[#F4E6CE] w-full h-28" style={{ borderColor: "#D9AB67" }}>
      <div className="relative">
        <Image src={item.imagem} alt={item.nome} width={80} height={80} className="rounded-lg" />
        <button
          className="absolute bottom-0 right-0 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md hover:bg-gray-800 active:scale-90 transition-transform duration-150"
          onClick={() => handleAddProduct(item)}
        >
          +
        </button>
      </div>
      <div className="flex flex-col justify-center flex-1">
        <h3 className="font-semibold text-lg text-black">{item.nome}</h3>
        <p className="text-sm text-black">{item.descricao}</p>
        <span className="text-sm font-bold text-black">{item.preco}</span>
      </div>
    </div>
  );
}
