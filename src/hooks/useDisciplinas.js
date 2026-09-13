import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import DisciplinaService from "@/services/DisciplinaService";
import Disciplina from "@/models/Disciplina";

export function useDisciplinas() {
  const { uid } = useAuth();
  const [disciplinas, setDisciplinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const service = uid ? new DisciplinaService(uid) : null;

  const carregar = useCallback(async () => {
    if (!service) return;
    setLoading(true);
    setError(null);
    try {
      const lista = await service.listar();
      setDisciplinas(lista);
    } catch (err) {
      void err;
      setError("Erro ao carregar disciplinas");
    } finally {
      setLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function adicionar(dados) {
    const d = new Disciplina(dados.nome, dados.creditos, dados.prerequisitos || [], dados.professor || "");
    await service.adicionar(d);
    await carregar();
  }

  async function atualizar(id, dados) {
    const d = new Disciplina(dados.nome, dados.creditos, dados.prerequisitos || [], dados.professor || "", id);
    await service.atualizar(id, d);
    await carregar();
  }

  async function remover(id) {
    await service.remover(id);
    await carregar();
  }

  async function toggleConcluida(disciplina) {
    await service.toggleConcluida(disciplina);
    await carregar();
  }

  const emCurso = disciplinas.filter((d) => !d.isConcluida());
  const concluidas = disciplinas.filter((d) => d.isConcluida());

  return {
    disciplinas,
    emCurso,
    concluidas,
    loading,
    error,
    adicionar,
    atualizar,
    remover,
    toggleConcluida,
    recarregar: carregar,
  };
}
