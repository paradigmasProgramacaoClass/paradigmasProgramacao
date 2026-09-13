import { Link } from "react-router-dom"
import Navbar from "@/components/Navbar"
import { useAluno } from "@/hooks/useAluno"
import { useDisciplinas } from "@/hooks/useDisciplinas"

export default function MeusCreditos() {
  const { aluno, creditosConcluidos, loading: loadingAluno } = useAluno()
  const { concluidas, loading: loadingDisciplinas } = useDisciplinas()

  if (loadingAluno || loadingDisciplinas) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-paragraph text-muted-foreground">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-regular-200 pb-12 font-sans">
      <Navbar logado />

      <main className="max-w-6xl mx-auto px-6">
        {/* Link Retornar */}
        <Link
          to="/"
          className="inline-flex items-center text-sm font-semibold text-primary hover:underline mb-6"
        >
          &lt; Retornar
        </Link>

        {/* Card Principal */}
        <div className="bg-white rounded-[2rem] border border-border p-10 shadow-sm min-h-[500px]">
          <h1 className="text-2xl font-bold text-foreground mb-1">Meus créditos</h1>
          <p className="text-sm font-medium text-regular-500 mb-6">
            Créditos totais e atribuídos a disciplinas.
          </p>

          <div className="mb-12">
            <span className="text-6xl font-semibold tracking-tight text-primary">{creditosConcluidos}</span>
            <span className="text-6xl font-semibold tracking-tight text-regular-400">/{aluno?.getCreditosNecessarios() || 0}</span>
          </div>

          <h2 className="text-xl font-bold text-foreground mb-6">
            Histórico de atribuição de créditos
          </h2>

          {concluidas.length === 0 ? (
            <p className="text-regular-500">Nenhuma disciplina concluída ainda.</p>
          ) : (
            <>
              {/* Tabela */}
              <div className="w-full overflow-x-auto relative">
                <table className="w-full text-sm text-left">
                  <thead className="bg-regular-100/50 rounded-xl">
                    <tr>
                      <th className="py-4 px-6 font-semibold text-foreground rounded-l-xl">Disciplina</th>
                      <th className="py-4 px-6 font-semibold text-foreground">Atividade</th>
                      <th className="py-4 px-6 font-semibold text-foreground">Créditos atribuídos</th>
                      <th className="py-4 px-6 font-semibold text-foreground rounded-r-xl">Atribuído em</th>
                    </tr>
                  </thead>
                  <tbody>
                    {concluidas.map((d) => (
                      <tr key={d.getId()} className="border-b border-regular-100 last:border-0 hover:bg-regular-100/30 transition-colors">
                        <td className="py-5 px-6 font-semibold text-foreground">{d.getNome()}</td>
                        <td className="py-5 px-6 font-medium text-regular-500">Conclusão da disciplina</td>
                        <td className="py-5 px-6 font-bold text-primary">{d.getCreditos()}+</td>
                        <td className="py-5 px-6 font-medium text-regular-500">{d.getDataCriacaoFormatada()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Scrollbar Mock - Apenas visual conforme mockup */}
                <div className="absolute right-0 top-16 bottom-0 w-1.5 bg-regular-300 rounded-full h-4/5" />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
