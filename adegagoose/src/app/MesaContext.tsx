"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Produto {
  nome: string;
  preco: number;
}

export interface Mesa {
  id: number;
  nome: string;
  ocupada: boolean;
  cliente?: string;
  telefone?: string;
  consumo?: number;
  produtos: Produto[];
}

interface MesaContextType {
  mesas: Mesa[];
  adicionarPedido: (mesaId: number, produto: Produto) => void;
}

const MesaContext = createContext<MesaContextType | undefined>(undefined);

export function MesaProvider({ children }: { children: ReactNode }) {
  const [mesas, setMesas] = useState<Mesa[]>([
    { id: 1, nome: "Mesa 1", ocupada: false, produtos: [] },
    { id: 2, nome: "Mesa 2", ocupada: false, produtos: [] },
    { id: 3, nome: "Mesa 3", ocupada: false, produtos: [] },
    { id: 4, nome: "Mesa 4", ocupada: false, produtos: [] },
    { id: 5, nome: "Mesa 5", ocupada: false, produtos: [] },
    { id: 6, nome: "Mesa 6", ocupada: false, produtos: [] },
  ]);

  const adicionarPedido = (mesaId: number, produto: Produto) => {
    setMesas((prev) =>
      prev.map((mesa) =>
        mesa.id === mesaId
          ? {
              ...mesa,
              ocupada: true,
              produtos: [...mesa.produtos, produto],
              consumo: (mesa.consumo || 0) + produto.preco,
            }
          : mesa
      )
    );
  };

  return (
    <MesaContext.Provider value={{ mesas, adicionarPedido }}>
      {children}
    </MesaContext.Provider>
  );
}

export const useMesas = () => {
  const context = useContext(MesaContext);
  if (!context) throw new Error("useMesas deve ser usado dentro de MesaProvider");
  return context;
};
