import { Link } from "react-router-dom"
import { Book, Wallet } from "lucide-react"
import Navbar from "@/components/Navbar"
import { useAuth } from "@/context/AuthContext"
import { useAluno } from "@/hooks/useAluno"
import { useDisciplinas } from "@/hooks/useDisciplinas"

export default function Home() {
  useAuth()
  const { aluno, creditosConcluidos, loading: loadingAluno } = useAluno()
  const { emCurso, loading: loadingDisciplinas } = useDisciplinas()

  if (loadingAluno || loadingDisciplinas) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-paragraph text-muted-foreground">Carregando...</p>
      </div>
    )
  }

  if (!aluno) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-paragraph text-muted-foreground">Perfil não encontrado.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-regular-200 pb-12 font-sans">
      <Navbar logado nomeUsuario={aluno.getNome()} />

      <main className="max-w-6xl mx-auto px-6 mt-8">

        {/* Card Principal: Disciplinas em curso */}
        <div className="bg-white rounded-[2rem] border border-border p-8 md:p-10 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">Disciplinas em curso</h1>
              <p className="text-sm font-medium text-regular-500">
                {aluno.getCurso()} - {aluno.getPeriodo()}º período
              </p>
            </div>
            <div className="text-right">
              <div className="mb-1">
                <span className="text-3xl font-semibold tracking-tight text-primary">{creditosConcluidos}</span>
                <span className="text-3xl font-semibold tracking-tight text-regular-400">/{aluno.getCreditosNecessarios()}</span>
              </div>
              <Link to="/meus-creditos" className="text-sm font-bold text-primary hover:underline underline-offset-2">
                Ver meus créditos
              </Link>
            </div>
          </div>

          {emCurso.length === 0 ? (
            <p className="text-regular-500">Nenhuma disciplina em curso.</p>
          ) : (
            <div className="space-y-8">
              {emCurso.map((d) => (
                <div key={d.getId()}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-foreground">{d.getNome()}</span>
                    <span className="text-sm font-bold"><span className="text-primary">0</span> <span className="text-regular-500 font-medium">/ {d.getCreditos()}</span></span>
                  </div>
                  <div className="w-full bg-regular-200 rounded-full h-3">
                    <div className="bg-primary h-3 rounded-full" style={{ width: "0%" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link to="/disciplinas" className="text-sm font-bold text-primary hover:underline">
              Ver mais
            </Link>
          </div>
        </div>

        {/* Ações Rápidas */}
        <h2 className="text-xl font-bold text-foreground mb-4">Ações rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Ação 1 */}
          <div className="bg-white rounded-3xl border border-border p-6 flex flex-col justify-between min-h-[160px] shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-foreground">Disciplinas</h3>
                <Book className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-regular-500 font-medium leading-relaxed">
                Acesse e gerencie as disciplinas do semestre atual.
              </p>
            </div>
            <Link to="/disciplinas" className="text-sm font-bold text-primary hover:underline mt-4">
              Visualizar &gt;
            </Link>
          </div>

          {/* Ação 2 */}
          <div className="bg-white rounded-3xl border border-border p-6 flex flex-col justify-between min-h-[160px] shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-foreground">Meus créditos</h3>
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-regular-500 font-medium leading-relaxed">
                Gerencie seus créditos.
              </p>
            </div>
            <Link to="/meus-creditos" className="text-sm font-bold text-primary hover:underline mt-4">
              Visualizar &gt;
            </Link>
          </div>

        </div>
      </main>
    </div>
  )
}
