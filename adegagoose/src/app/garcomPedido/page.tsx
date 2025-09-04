"use client";

import { useState } from "react";

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

interface Mesa {
  id: number;
  nome: string;
  ocupada: boolean;
}

export default function PedidosGarcom() {
  // Mesas
  const mesas: Mesa[] = [
    { id: 1, nome: "Mesa 1", ocupada: true },
    { id: 2, nome: "Mesa 2", ocupada: true },
    { id: 3, nome: "Mesa 3", ocupada: false },
    { id: 4, nome: "Mesa 4", ocupada: true },
    { id: 5, nome: "Mesa 5", ocupada: false },
  ];

  // Produtos disponíveis
  const produtos: Produto[] = [
    { id: 1, nome: "Cerveja Heineken", preco: 12.9 },
    { id: 2, nome: "Vodka Absolut", preco: 89.9 },
    { id: 3, nome: "Hambúrguer", preco: 30.0 },
    { id: 4, nome: "Batata Frita", preco: 15.0 },
    { id: 5, nome: "Refrigerante", preco: 5.0 },
  ];

  const [mesaSelecionada, setMesaSelecionada] = useState<Mesa | null>(null);
  const [carrinho, setCarrinho] = useState<{ produto: Produto; quantidade: number }[]>([]);

  const adicionarProduto = (produto: Produto) => {
    setCarrinho((prev) => {
      const existente = prev.find((item) => item.produto.id === produto.id);
      if (existente) {
        return prev.map((item) =>
          item.produto.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...prev, { produto, quantidade: 1 }];
      }
    });
  };

  const removerProduto = (produtoId: number) => {
    setCarrinho((prev) => prev.filter((item) => item.produto.id !== produtoId));
  };

  const finalizarPedido = () => {
    if (!mesaSelecionada || carrinho.length === 0) {
      alert("Selecione uma mesa e adicione produtos ao pedido!");
      return;
    }

    alert(
      `Pedido finalizado para ${mesaSelecionada.nome}:\n` +
        carrinho
          .map((item) => `${item.produto.nome} x ${item.quantidade}`)
          .join("\n") +
        `\nTotal: R$ ${carrinho
          .reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0)
          .toFixed(2)}`
    );

    // Limpar seleção
    setMesaSelecionada(null);
    setCarrinho([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F4E6CE] p-4">
      <h1 className="text-2xl font-bold text-[#38331E] mb-6 text-center">Pedidos das Mesas</h1>

      {/* Seleção de mesa */}
      <div className="mb-6 flex gap-4 flex-wrap justify-center">
        {mesas.map((mesa) => (
          <button
            key={mesa.id}
            disabled={!mesa.ocupada}
            onClick={() => setMesaSelecionada(mesa)}
            className={`px-4 py-2 rounded-md font-semibold ${
              mesaSelecionada?.id === mesa.id
                ? "bg-[#D9AB67] text-[#38331E]"
                : mesa.ocupada
                ? "bg-[#38331E] text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            {mesa.nome}
          </button>
        ))}
      </div>

      {/* Lista de produtos */}
      <h2 className="text-xl font-semibold mb-2">Produtos Disponíveis</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-[#D9AB67] p-4 rounded-lg cursor-pointer hover:opacity-80"
            onClick={() => adicionarProduto(produto)}
          >
            <p className="font-semibold text-[#38331E]">{produto.nome}</p>
            <p className="text-[#38331E]">R$ {produto.preco.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Carrinho */}
      <h2 className="text-xl font-semibold mb-2">Carrinho</h2>
      <div className="flex flex-col gap-2 mb-6">
        {carrinho.length === 0 && <p className="text-[#38331E]">Nenhum produto adicionado</p>}
        {carrinho.map((item) => (
          <div
            key={item.produto.id}
            className="flex justify-between items-center bg-[#F4E6CE] border border-[#D9AB67] rounded-lg p-2"
          >
            <p className="text-[#38331E]">
              {item.produto.nome} x {item.quantidade}
            </p>
            <button
              className="px-2 py-1 rounded-md bg-[#B91C1C] text-white hover:opacity-80"
              onClick={() => removerProduto(item.produto.id)}
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      {/* Finalizar pedido */}
      <button
        onClick={finalizarPedido}
        className="w-full py-3 rounded-md font-semibold bg-[#38331E] text-white hover:opacity-90 transition"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}
