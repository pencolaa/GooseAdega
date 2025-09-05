"use client";

import { useState } from "react";
import Image from "next/image";

export type Produto = { nome: string; preco: number; imagem: string };

export default function CardapioCliente() {
  const categorias: { nome: string; produtos: Produto[] }[] = [
    {
      nome: "Lanches",
      produtos: [
        { nome: "Hambúrguer Clássico", preco: 30, imagem: "/produtos/lanches/hamburguer.png" },
        { nome: "Cheeseburger", preco: 32, imagem: "/produtos/lanches/cheeseburger.png" },
        { nome: "X-Salada", preco: 33, imagem: "/produtos/lanches/xsalada.png" },
        { nome: "X-Bacon", preco: 35, imagem: "/produtos/lanches/xbacon.png" },
        { nome: "Hot Dog", preco: 25, imagem: "/produtos/lanches/hotdog.png" },
        { nome: "Frango Empanado", preco: 28, imagem: "/produtos/lanches/frango.png" },
        { nome: "Sanduíche Vegetariano", preco: 30, imagem: "/produtos/lanches/vegetariano.png" },
        { nome: "Wrap de Frango", preco: 31, imagem: "/produtos/lanches/wrap.png" },
        { nome: "Hambúrguer Vegano", preco: 34, imagem: "/produtos/lanches/hamburguer_vegano.png" },
        { nome: "Batata Recheada", preco: 29, imagem: "/produtos/lanches/batata.png" },
      ],
    },
    {
      nome: "Bebidas",
      produtos: [
        { nome: "Coca-Cola", preco: 5, imagem: "/produtos/bebidas/coca.png" },
        { nome: "Guaraná", preco: 5, imagem: "/produtos/bebidas/guarana.png" },
        { nome: "Fanta Laranja", preco: 5, imagem: "/produtos/bebidas/fanta_laranja.png" },
        { nome: "Fanta Uva", preco: 5, imagem: "/produtos/bebidas/fanta_uva.png" },
        { nome: "Sprite", preco: 5, imagem: "/produtos/bebidas/sprite.png" },
        { nome: "Pepsi", preco: 5, imagem: "/produtos/bebidas/pepsi.png" },
        { nome: "H2OH!", preco: 6, imagem: "/produtos/bebidas/h2oh.png" },
        { nome: "Schweppes", preco: 6, imagem: "/produtos/bebidas/schweppes.png" },
        { nome: "Suco de Laranja", preco: 6, imagem: "/produtos/bebidas/suco_laranja.png" },
        { nome: "Suco de Uva", preco: 6, imagem: "/produtos/bebidas/suco_uva.png" },
      ],
    },
    {
      nome: "Drinks",
      produtos: [
        { nome: "Caipirinha", preco: 15, imagem: "/produtos/drinks/caipirinha.png" },
        { nome: "Mojito", preco: 18, imagem: "/produtos/drinks/mojito.png" },
        { nome: "Sex on the Beach", preco: 20, imagem: "/produtos/drinks/sex_on_the_beach.png" },
        { nome: "Piña Colada", preco: 20, imagem: "/produtos/drinks/pina_colada.png" },
        { nome: "Margarita", preco: 22, imagem: "/produtos/drinks/margarita.png" },
        { nome: "Bloody Mary", preco: 19, imagem: "/produtos/drinks/bloody_mary.png" },
        { nome: "Cosmopolitan", preco: 21, imagem: "/produtos/drinks/cosmopolitan.png" },
        { nome: "Gin Tônica", preco: 18, imagem: "/produtos/drinks/gin.png" },
        { nome: "Cuba Libre", preco: 16, imagem: "/produtos/drinks/cuba_libre.png" },
        { nome: "Martini", preco: 23, imagem: "/produtos/drinks/martini.png" },
      ],
    },
    {
      nome: "Cervejas",
      produtos: [
        { nome: "Heineken", preco: 12, imagem: "/produtos/cervejas/heineken.png" },
        { nome: "Budweiser", preco: 11, imagem: "/produtos/cervejas/budweiser.png" },
        { nome: "Skol", preco: 10, imagem: "/produtos/cervejas/skol.png" },
        { nome: "Brahma", preco: 10, imagem: "/produtos/cervejas/brahma.png" },
        { nome: "Stella Artois", preco: 13, imagem: "/produtos/cervejas/stella.png" },
        { nome: "Corona", preco: 14, imagem: "/produtos/cervejas/corona.png" },
        { nome: "Beck's", preco: 13, imagem: "/produtos/cervejas/becks.png" },
        { nome: "Eisenbahn", preco: 15, imagem: "/produtos/cervejas/eisenbahn.png" },
        { nome: "Bohemia", preco: 12, imagem: "/produtos/cervejas/bohemia.png" },
        { nome: "Antarctica", preco: 10, imagem: "/produtos/cervejas/antarctica.png" },
      ],
    },
    {
      nome: "Narguiles",
      produtos: [
        { nome: "Maçã", preco: 50, imagem: "/produtos/narguiles/maca.png" },
        { nome: "Menta", preco: 45, imagem: "/produtos/narguiles/menta.png" },
        { nome: "Uva", preco: 48, imagem: "/produtos/narguiles/uva.png" },
        { nome: "Melancia", preco: 47, imagem: "/produtos/narguiles/melancia.png" },
        { nome: "Morango", preco: 50, imagem: "/produtos/narguiles/morango.png" },
        { nome: "Blueberry", preco: 52, imagem: "/produtos/narguiles/blueberry.png" },
        { nome: "Coco", preco: 49, imagem: "/produtos/narguiles/coco.png" },
        { nome: "Manga", preco: 50, imagem: "/produtos/narguiles/manga.png" },
        { nome: "Limão", preco: 46, imagem: "/produtos/narguiles/limao.png" },
        { nome: "Tropical Mix", preco: 55, imagem: "/produtos/narguiles/tropical.png" },
      ],
    },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);

  const categoriasParaMostrar = categoriaSelecionada
    ? categorias.filter((c) => c.nome === categoriaSelecionada)
    : categorias;

  return (
    <div className="flex flex-col min-h-screen bg-[#F4E6CE] px-4 py-6">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#38331E]">Cardápio Goose Adega</h1>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 bg-[#D8A865] rounded-md text-sm font-semibold"
          >
            ☰ Categorias
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-[#D8A865] border border-[#D9AB67] rounded-md shadow-md z-10">
              <button
                onClick={() => { setCategoriaSelecionada(null); setMenuOpen(false); }}
                className="w-full text-left px-4 py-2 hover:bg-[#c99e5e] rounded-t-md"
              >
                Todas
              </button>
              {categorias.map((c, i) => (
                <button
                  key={c.nome}
                  onClick={() => { setCategoriaSelecionada(c.nome); setMenuOpen(false); }}
                  className={`w-full text-left px-4 py-2 hover:bg-[#c99e5e] ${i === categorias.length - 1 ? "rounded-b-md" : ""}`}
                >
                  {c.nome}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Categorias com produtos */}
      {categoriasParaMostrar.map((categoria) => (
        <div key={categoria.nome} className="mb-6">
          <h2 className="text-xl font-bold text-[#38331E] mb-3">{categoria.nome}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categoria.produtos.map((produto) => (
              <div
                key={produto.nome}
                className="flex flex-col items-center bg-[#F4E6CE] border border-[#D9AB67] rounded-lg p-3"
              >
                <div className="w-full h-32 relative mb-3">
                  <Image
                    src={produto.imagem}
                    alt={produto.nome}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="w-full flex justify-between items-center">
                  <span className="text-[#38331E] font-medium">{produto.nome}</span>
                  <span className="text-[#38331E] font-bold">R$ {produto.preco.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
