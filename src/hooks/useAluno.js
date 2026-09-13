import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import AlunoService from "@/services/AlunoService";
import DisciplinaService from "@/services/DisciplinaService";

export function useAluno() {
  const { uid } = useAuth();
  const [aluno, setAluno] = useState(null);
  const [creditosConcluidos, setCreditosConcluidos] = useState(0);
  const [creditosRestantes, setCreditosRestantes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const service = uid ? new AlunoService(uid, new DisciplinaService(uid)) : null;

  const carregar = useCallback(async () => {
    if (!service) return;
    setLoading(true);
    setError(null);
    try {
      const perfil = await service.buscar();
      setAluno(perfil);
      if (perfil) {
        const concluidos = await service.creditosConcluidos();
        const restantes = await service.creditosRestantes();
        setCreditosConcluidos(concluidos);
        setCreditosRestantes(restantes);
      }
    } catch (err) {
      void err;
      setError("Erro ao carregar perfil");
    } finally {
      setLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { aluno, creditosConcluidos, creditosRestantes, loading, error, recarregar: carregar };
}
