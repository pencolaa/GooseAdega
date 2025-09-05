"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Produto = { nome: string; preco: number };

export type Mesa = {
  id: number;
  nome: string;
  ocupada: boolean;
  cliente?: string;
  telefone?: string;
  consumo?: number;
  produtos: Produto[];
};

type MesaContextType = {
  mesas: Mesa[];
  ocuparMesa: (id: number, cliente: string, telefone: string) => void;
  liberarMesa: (id: number) => void;
  adicionarProduto: (id: number, produto: Produto) => void;
};

const MesaContext = createContext<MesaContextType | undefined>(undefined);

export const MesaProvider = ({ children }: { children: ReactNode }) => {
  const [mesas, setMesas] = useState<Mesa[]>(
    Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      nome: `Mesa ${i + 1}`,
      ocupada: false,
      produtos: [],
      consumo: 0,
    }))
  );

  const ocuparMesa = (id: number, cliente: string, telefone: string) => {
    setMesas((prev) =>
      prev.map((mesa) =>
        mesa.id === id
          ? {
              ...mesa,
              ocupada: true,
              cliente,
              telefone,
              produtos: [], // limpa pedidos antigos
              consumo: 0,   // zera consumo
            }
          : mesa
      )
    );
  };

  const liberarMesa = (id: number) => {
    setMesas((prev) =>
      prev.map((mesa) =>
        mesa.id === id
          ? {
              ...mesa,
              ocupada: false,
              cliente: "",
              telefone: "",
              produtos: [],
              consumo: 0,
            }
          : mesa
      )
    );
  };

  const adicionarProduto = (id: number, produto: Produto) => {
    setMesas((prev) =>
      prev.map((mesa) =>
        mesa.id === id
          ? {
              ...mesa,
              produtos: [...mesa.produtos, produto],
              consumo: (mesa.consumo || 0) + produto.preco,
            }
          : mesa
      )
    );
  };

  return (
    <MesaContext.Provider value={{ mesas, ocuparMesa, liberarMesa, adicionarProduto }}>
      {children}
    </MesaContext.Provider>
  );
};

export const useMesas = () => {
  const context = useContext(MesaContext);
  if (!context) throw new Error("useMesas must be used within a MesaProvider");
  return context;
};
