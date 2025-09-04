"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Produto {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
}

export default function MeusProdutos() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const [produtos, setProdutos] = useState<Produto[]>([
    { id: 1, nome: "Cerveja Heineken 600ml", preco: "R$ 12,90", imagem: "/heineken.jpg" },
    { id: 2, nome: "Vodka Absolut 1L", preco: "R$ 89,90", imagem: "/vodkaAbsolut.jpg" },
    { id: 3, nome: "Whisky Johnnie Walker Red", preco: "R$ 119,90", imagem: "/johnnie.jpg" },
  ]);

  // Editar produto
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

  // Remover produto
  const removerProduto = (id: number) => {
    if (confirm("Tem certeza que deseja remover este produto?")) {
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Adicionar produto
  const adicionarProduto = () => {
    const nome = prompt("Digite o nome do produto:");
    if (!nome) return;

    const preco = prompt("Digite o preço do produto:");
    if (!preco) return;

    const imagem = prompt("Digite o caminho da imagem do produto:", "/default.jpg");
    const novoProduto: Produto = {
      id: produtos.length ? produtos[produtos.length - 1].id + 1 : 1,
      nome,
      preco,
      imagem: imagem || "/default.jpg",
    };

    setProdutos((prev) => [...prev, novoProduto]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F4E6CE] px-4 py-6 relative">
      {/* Cabeçalho */}
      <header className="flex flex-col items-center mb-8 relative">
        <Image src="/ganso.png" alt="Logo" width={50} height={50} className="mb-2" />
        <h1 className="text-2xl font-bold text-[#38331E] mb-2">Meus Produtos</h1>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute right-0 top-0 p-2 focus:outline-none"
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-[#38331E]"></span>
            <span className="block w-6 h-0.5 bg-[#38331E]"></span>
            <span className="block w-6 h-0.5 bg-[#38331E]"></span>
          </div>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-12 w-40 bg-[#D8A865] rounded-lg shadow-lg z-10">
            <ul className="flex flex-col text-[#38331E]">
              <li className="px-4 py-2 hover:bg-[#c99e5e] cursor-pointer">Perfil</li>
              <li className="px-4 py-2 hover:bg-[#c99e5e] cursor-pointer">Configurações</li>
              <li
                className="px-4 py-2 hover:bg-[#c99e5e] cursor-pointer"
                onClick={() => router.push("/mapaMesas")}
              >
                Mapas
              </li>
              <li className="px-4 py-2 hover:bg-[#c99e5e] cursor-pointer">Sair</li>
            </ul>
          </div>
        )}
      </header>

      {/* Lista de produtos */}
      <div className="grid grid-cols-1 gap-4 flex-1">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="flex items-center justify-between bg-[#F4E6CE] border border-[#D9AB67] rounded-lg p-4"
          >
            <div className="flex items-center gap-4">
              <Image
                src={produto.imagem}
                alt={produto.nome}
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-[#38331E]">{produto.nome}</h2>
                <p className="text-[#38331E]">{produto.preco}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => editarProduto(produto.id)}
                className="px-4 py-2 rounded-md hover:opacity-80"
                style={{ backgroundColor: "#38331E", color: "white" }}
              >
                Editar
              </button>
              <button
                onClick={() => removerProduto(produto.id)}
                className="px-4 py-2 rounded-md hover:opacity-80"
                style={{ backgroundColor: "#B91C1C", color: "white" }}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Botão adicionar produto */}
      <div className="mt-8">
        <button
          onClick={adicionarProduto}
          className="w-full py-3 font-semibold rounded-lg hover:opacity-80"
          style={{ backgroundColor: "#38331E", color: "white" }}
        >
          + Adicionar Produto
        </button>
      </div>
    </div>
  );
}
