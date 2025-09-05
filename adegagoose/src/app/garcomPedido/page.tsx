"use client";

import { useState } from "react";
import Link from "next/link";
import { useMesas, Produto } from "../context/MesaContext";

export default function GarcomPedido() {
  const { mesas, adicionarProduto } = useMesas();

  const [mesaId, setMesaId] = useState<number | null>(null);
  const [produtosSelecionados, setProdutosSelecionados] = useState<Produto[]>([]);

  const categorias: { nome: string; produtos: Produto[] }[] = [
    // Mesmas categorias do seu código anterior
    {
      nome: "Lanches",
      produtos: [
        { nome: "Hambúrguer Clássico", preco: 30 },
        { nome: "Cheeseburger", preco: 32 },
        { nome: "X-Salada", preco: 33 },
        { nome: "X-Bacon", preco: 35 },
        { nome: "Hot Dog", preco: 25 },
        { nome: "Frango Empanado", preco: 28 },
        { nome: "Sanduíche Vegetariano", preco: 30 },
        { nome: "Wrap de Frango", preco: 31 },
        { nome: "Hambúrguer Vegano", preco: 34 },
        { nome: "Batata Recheada", preco: 29 },
      ],
    },
    {
      nome: "Refrigerantes",
      produtos: [
        { nome: "Coca-Cola", preco: 5 },
        { nome: "Guaraná", preco: 5 },
        { nome: "Fanta Laranja", preco: 5 },
        { nome: "Fanta Uva", preco: 5 },
        { nome: "Sprite", preco: 5 },
        { nome: "Pepsi", preco: 5 },
        { nome: "H2OH!", preco: 6 },
        { nome: "Schweppes", preco: 6 },
        { nome: "Suco de Laranja", preco: 6 },
        { nome: "Suco de Uva", preco: 6 },
      ],
    },
    {
      nome: "Drinks",
      produtos: [
        { nome: "Caipirinha", preco: 15 },
        { nome: "Mojito", preco: 18 },
        { nome: "Sex on the Beach", preco: 20 },
        { nome: "Piña Colada", preco: 20 },
        { nome: "Margarita", preco: 22 },
        { nome: "Bloody Mary", preco: 19 },
        { nome: "Cosmopolitan", preco: 21 },
        { nome: "Gin Tônica", preco: 18 },
        { nome: "Cuba Libre", preco: 16 },
        { nome: "Martini", preco: 23 },
      ],
    },
    {
      nome: "Cervejas",
      produtos: [
        { nome: "Heineken", preco: 12 },
        { nome: "Budweiser", preco: 11 },
        { nome: "Skol", preco: 10 },
        { nome: "Brahma", preco: 10 },
        { nome: "Stella Artois", preco: 13 },
        { nome: "Corona", preco: 14 },
        { nome: "Beck's", preco: 13 },
        { nome: "Eisenbahn", preco: 15 },
        { nome: "Bohemia", preco: 12 },
        { nome: "Antarctica", preco: 10 },
      ],
    },
    {
      nome: "Narguiles",
      produtos: [
        { nome: "Maçã", preco: 50 },
        { nome: "Menta", preco: 45 },
        { nome: "Uva", preco: 48 },
        { nome: "Melancia", preco: 47 },
        { nome: "Morango", preco: 50 },
        { nome: "Blueberry", preco: 52 },
        { nome: "Coco", preco: 49 },
        { nome: "Manga", preco: 50 },
        { nome: "Limão", preco: 46 },
        { nome: "Tropical Mix", preco: 55 },
      ],
    },
  ];

  const handleToggleProduto = (produto: Produto) => {
    if (produtosSelecionados.find((p) => p.nome === produto.nome)) {
      setProdutosSelecionados(produtosSelecionados.filter((p) => p.nome !== produto.nome));
    } else {
      setProdutosSelecionados([...produtosSelecionados, produto]);
    }
  };

  const handleAdicionar = () => {
    if (!mesaId || produtosSelecionados.length === 0) return;

    produtosSelecionados.forEach((produto) => adicionarProduto(mesaId, { ...produto }));
    setProdutosSelecionados([]);
  };

  const total = produtosSelecionados.reduce((acc, p) => acc + p.preco, 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#F4E6CE] px-4 py-6">
      <h1 className="text-2xl font-bold text-[#38331E] mb-6 text-center">
        Fazer Pedido
      </h1>

      <label className="mb-2 font-semibold text-[#38331E]">Selecione a mesa:</label>
      <select
        value={mesaId ?? ""}
        onChange={(e) => setMesaId(Number(e.target.value))}
        className="p-2 rounded mb-4 border border-gray-400 bg-[#D8A865] text-[#38331E] font-semibold"
      >
        <option value="">-- Escolher mesa --</option>
        {mesas.map((mesa) => (
          <option key={mesa.id} value={mesa.id}>
            {mesa.nome}
          </option>
        ))}
      </select>

      {categorias.map((categoria) => (
        <div key={categoria.nome} className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-[#38331E]">{categoria.nome}</h2>
          <div className="grid grid-cols-2 gap-2">
            {categoria.produtos.map((produto) => (
              <label
                key={produto.nome}
                className="flex items-center bg-[#D8A865] text-[#38331E] p-2 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={!!produtosSelecionados.find((p) => p.nome === produto.nome)}
                  onChange={() => handleToggleProduto(produto)}
                  className="mr-2"
                />
                {produto.nome} - R$ {produto.preco.toFixed(2)}
              </label>
            ))}
          </div>
        </div>
      ))}

      {produtosSelecionados.length > 0 && (
        <div className="mb-4 font-semibold text-[#38331E]">
          <p>Selecionados: {produtosSelecionados.map((p) => p.nome).join(", ")}</p>
          <p>Total: R$ {total.toFixed(2)}</p>
        </div>
      )}

      <button
        onClick={handleAdicionar}
        className="bg-[#38331E] text-white py-3 rounded-md font-semibold hover:opacity-90 transition mb-4"
      >
        Adicionar Pedido
      </button>

      {/* Botão para ver mesas */}
      <Link
        href="/mapaMesas"
        className="bg-[#D8A865] text-[#38331E] py-3 rounded-md font-semibold hover:opacity-90 transition text-center"
      >
        Ver Mesas
      </Link>
    </div>
  );
}
