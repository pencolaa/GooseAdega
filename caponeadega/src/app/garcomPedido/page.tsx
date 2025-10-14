"use client";

import { useState } from "react";
import { useMesas, Produto } from "../context/MesaContext";

export default function GarcomPedido() {
  const { mesas, adicionarProduto, ocuparMesa } = useMesas();
  const [mesaId, setMesaId] = useState<number | null>(null);
  const [quantidades, setQuantidades] = useState<{ [key: string]: number }>({});

  const categorias: { nome: string; produtos: Produto[] }[] = [
    {
      nome: "Lanches",
      produtos: [
        { nome: "Hambúrguer Clássico", preco: 30 },
        { nome: "Cheeseburger", preco: 32 },
        { nome: "X-Salada", preco: 33 },
      ],
    },
    {
      nome: "Refrigerantes",
      produtos: [
        { nome: "Coca-Cola", preco: 5 },
        { nome: "Guaraná", preco: 5 },
      ],
    },
  ];

  const handleQuantidade = (produto: Produto, valor: number) => {
    setQuantidades((prev) => ({
      ...prev,
      [produto.nome]: Math.max(0, (prev[produto.nome] || 0) + valor),
    }));
  };

  const handleAdicionar = () => {
    if (!mesaId) return;

    // Marca mesa como ocupada se ainda não estiver
    const mesa = mesas.find((m) => m.id === mesaId);
    if (mesa && !mesa.ocupada) {
      ocuparMesa(mesaId, "Cliente", "123456789"); // Você pode personalizar o cliente/telefone
    }

    // Adiciona os produtos
    Object.entries(quantidades).forEach(([nome, qtd]) => {
      if (qtd > 0) {
        const produto = categorias.flatMap((c) => c.produtos).find((p) => p.nome === nome);
        if (produto) {
          for (let i = 0; i < qtd; i++) {
            adicionarProduto(mesaId, { ...produto });
          }
        }
      }
    });

    setQuantidades({});
  };

  const total = Object.entries(quantidades).reduce((acc, [nome, qtd]) => {
    const produto = categorias.flatMap((c) => c.produtos).find((p) => p.nome === nome);
    return produto ? acc + produto.preco * qtd : acc;
  }, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1c1c1c] to-black text-white px-4 sm:px-6 md:px-10 py-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6" style={{ fontFamily: "'Mokoto', sans-serif" }}>
        Fazer Pedido
      </h1>

      {/* Seleção de mesa */}
      <div className="mb-6 flex flex-col items-center w-full max-w-md mx-auto">
        <label className="mb-2 font-semibold text-red-700 text-lg" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          Selecione a mesa:
        </label>
        <select
          value={mesaId ?? ""}
          onChange={(e) => setMesaId(Number(e.target.value))}
          className="w-full p-3 rounded-md bg-black border border-red-700 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-red-700 transition"
        >
          <option value="">-- Escolher mesa --</option>
          {mesas.map((mesa) => (
            <option key={mesa.id} value={mesa.id}>
              {mesa.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Categorias e produtos */}
      {categorias.map((categoria) => (
        <div key={categoria.nome} className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 text-red-700" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            {categoria.nome}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {categoria.produtos.map((produto) => (
              <div key={produto.nome} className="flex items-center justify-between p-3 rounded-md bg-black text-white font-semibold">
                <div>
                  <p>{produto.nome}</p>
                  <p>R$ {produto.preco.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleQuantidade(produto, -1)} className="bg-red-700 px-2 rounded hover:bg-red-800 transition">-</button>
                  <span>{quantidades[produto.nome] || 0}</span>
                  <button onClick={() => handleQuantidade(produto, 1)} className="bg-red-700 px-2 rounded hover:bg-red-800 transition">+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Resumo do pedido */}
      {total > 0 && (
        <div className="mb-4 font-semibold text-lg text-red-700" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          <p>Total do pedido: R$ {total.toFixed(2)}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <button onClick={handleAdicionar} className="w-full sm:w-64 py-3 rounded-lg font-bold bg-red-700 hover:bg-red-800 transition" style={{ fontFamily: "'Mokoto', sans-serif" }}>
          Adicionar Pedido
        </button>
      </div>
    </div>
  );
}
