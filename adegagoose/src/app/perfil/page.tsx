"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
}

export default function PerfilRestaurante() {
  const router = useRouter();

  // Perfil do chefe
  const chefe = {
    nome: "Carlos Silva",
    cargo: "Gerente do Restaurante",
    imagem: "/chefe.jpg",
  };

  // Lista de funcionários
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([
    { id: 1, nome: "João", cargo: "Garçom" },
    { id: 2, nome: "Maria", cargo: "Cozinheira" },
    { id: 3, nome: "Pedro", cargo: "Caixa" },
  ]);

  // Editar funcionário
  const editarFuncionario = (id: number) => {
    const funcionario = funcionarios.find((f) => f.id === id);
    if (!funcionario) return;

    const novoNome = prompt("Digite o novo nome do funcionário:", funcionario.nome);
    if (!novoNome) return;

    const novoCargo = prompt("Digite o novo cargo do funcionário:", funcionario.cargo);
    if (!novoCargo) return;

    setFuncionarios((prev) =>
      prev.map((f) => (f.id === id ? { ...f, nome: novoNome, cargo: novoCargo } : f))
    );
  };

  // Remover funcionário
  const removerFuncionario = (id: number) => {
    if (confirm("Deseja realmente remover este funcionário?")) {
      setFuncionarios((prev) => prev.filter((f) => f.id !== id));
    }
  };

  // Adicionar funcionário
  const adicionarFuncionario = () => {
    const nome = prompt("Digite o nome do novo funcionário:");
    if (!nome) return;

    const cargo = prompt("Digite o cargo do novo funcionário:");
    if (!cargo) return;

    const novoFuncionario: Funcionario = {
      id: funcionarios.length ? funcionarios[funcionarios.length - 1].id + 1 : 1,
      nome,
      cargo,
    };

    setFuncionarios((prev) => [...prev, novoFuncionario]);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-[#F4E6CE] px-4 py-6">
      {/* Perfil do Chefe */}
      <div className="flex flex-col items-center mb-8 bg-[#D9AB67] p-6 rounded-lg shadow-lg">
        <Image
          src={chefe.imagem}
          alt={chefe.nome}
          width={100}
          height={100}
          className="rounded-full mb-4"
        />
        <h1 className="text-2xl font-bold text-[#38331E]">{chefe.nome}</h1>
        <p className="text-[#38331E]">{chefe.cargo}</p>
      </div>

      {/* Botão adicionar funcionário */}
      <div className="mb-4">
        <button
          onClick={adicionarFuncionario}
          className="w-full py-3 rounded-md font-semibold hover:opacity-90 transition"
          style={{ backgroundColor: "#38331E", color: "white" }}
        >
          + Adicionar Funcionário
        </button>
      </div>

      {/* Lista de funcionários */}
      <div className="flex flex-col gap-4">
        {funcionarios.map((funcionario) => (
          <div
            key={funcionario.id}
            className="flex items-center justify-between bg-[#F4E6CE] border border-[#D9AB67] rounded-lg p-4"
          >
            <div>
              <h2 className="text-lg font-semibold text-[#38331E]">{funcionario.nome}</h2>
              <p className="text-[#38331E]">{funcionario.cargo}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => editarFuncionario(funcionario.id)}
                className="px-4 py-2 rounded-md hover:opacity-80"
                style={{ backgroundColor: "#38331E", color: "white" }}
              >
                Editar
              </button>
              <button
                onClick={() => removerFuncionario(funcionario.id)}
                className="px-4 py-2 rounded-md hover:opacity-80"
                style={{ backgroundColor: "#B91C1C", color: "white" }}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Botão de voltar fixo no canto inferior esquerdo */}
      <button
        onClick={() => router.back()}
        className="absolute bottom-4 left-4 px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
        style={{ backgroundColor: "#38331E", color: "white" }}
      >
        ← Voltar
      </button>
    </div>
  );
}
