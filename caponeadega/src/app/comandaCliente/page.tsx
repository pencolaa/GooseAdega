"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

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
  const router = useRouter();

  useEffect(() => {
    // Obtém a mesa do cliente
    let mesaCliente = localStorage.getItem("mesaCliente");
    if (!mesaCliente) {
      // caso não exista, gera um ID único e salva
      mesaCliente = "mesa-" + Math.floor(Math.random() * 10000);
      localStorage.setItem("mesaCliente", mesaCliente);
    }
    setMesa(mesaCliente);

    const updateComanda = () => {
      const todasComandas = JSON.parse(localStorage.getItem("comandas") || "{}");
      const comandaMesa: Produto[] = todasComandas[mesaCliente!] || [];
      setProdutos(comandaMesa.map(p => ({ ...p, quantidade: p.quantidade || 1 })));
    };

    updateComanda();
    window.addEventListener("comandaUpdated", updateComanda);
    return () => window.removeEventListener("comandaUpdated", updateComanda);
  }, []);

  const total = produtos.reduce((acc, p) => {
    const preco = parseFloat(p.preco.replace("R$", "").replace(",", "."));
    return acc + preco * (p.quantidade || 1);
  }, 0);

  return (
    <main className="min-h-screen flex justify-center items-start p-4 bg-[#F4E6CE] w-full">
      <div className="w-1/2 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-black text-center">Comanda Cliente</h1>

        {produtos.length === 0 ? (
          <p className="text-lg mb-6 font-semibold text-black text-center">
            Nenhum produto foi adicionado ainda.
          </p>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            {produtos.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border rounded-xl bg-[#F4E6CE] shadow-sm w-full"
                style={{ borderColor: "#D9AB67" }}
              >
                <div className="relative flex-shrink-0">
                  <Image
                    src={item.imagem}
                    alt={item.nome}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center flex-1">
                  <h2 className="font-semibold text-lg text-black">{item.nome}</h2>
                  <p className="text-sm text-black">{item.descricao}</p>
                  <span className="text-sm font-bold text-black">{item.preco}</span>
                  <span className="text-sm text-black mt-1">
                    Quantidade: {item.quantidade}
                  </span>
                </div>
              </div>
            ))}

            <div
              className="mt-4 p-4 border rounded-xl flex justify-between items-center shadow-sm w-full"
              style={{ borderColor: "#D9AB67", backgroundColor: "#F4E6CE" }}
            >
              <span className="font-semibold text-lg text-black">Total:</span>
              <span className="font-semibold text-lg text-black">
                R${total.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={() => router.push("/cardapio")}
          className="mt-6 text-black underline font-semibold hover:text-gray-700 transition-colors"
        >
          Voltar ao cardápio
        </button>
      </div>
    </main>
  );
}
