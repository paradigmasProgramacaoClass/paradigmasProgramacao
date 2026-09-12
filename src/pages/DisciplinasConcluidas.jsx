import { Link } from "react-router-dom"
import Navbar from "@/components/Navbar"

const disciplinas = [
  { nome: "Paradigmas de Programação", professor: "Professor Cicrano Blau", creditos: "200/200", data: "26/03/2026" },
  // Mais linhas podem ser adicionadas aqui
]

export default function DisciplinasConcluidas() {
  return (
    <div className="min-h-screen bg-regular-200 pb-12 font-sans relative">
      <Navbar logado nomeUsuario="Fulano de Tal" />

      {/* Segmented Control (Toggle) Centralizado */}
      <div className="absolute top-[88px] left-1/2 -translate-x-1/2 flex items-center bg-regular-300/40 rounded-full p-1 z-10">
        <Link to="/disciplinas" className="px-6 py-2 rounded-full text-sm font-semibold text-regular-600 hover:text-foreground transition-colors">
          Em curso
        </Link>
        <button className="px-6 py-2 rounded-full text-sm font-semibold bg-primary text-white shadow-sm transition-colors cursor-default">
          Concluídas
        </button>
      </div>

      <main className="max-w-6xl mx-auto px-6 mt-16">
        {/* Link Retornar */}
        <Link
          to="/meus-creditos"
          className="inline-flex items-center text-sm font-semibold text-primary hover:underline mb-6"
        >
          &lt; Retornar
        </Link>

        {/* Card Principal */}
        <div className="bg-white rounded-[2rem] border border-border p-10 shadow-sm min-h-[500px] flex flex-col">
          <h1 className="text-2xl font-bold text-foreground mb-1">Disciplinas concluídas</h1>
          <p className="text-sm font-medium text-regular-500 mb-8">
            Disciplinas concluídas neste período.
          </p>

          {/* Tabela */}
          <div className="w-full overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="bg-regular-100/50 rounded-xl">
                <tr>
                  <th className="py-4 px-6 font-semibold text-foreground rounded-l-xl">Nome</th>
                  <th className="py-4 px-6 font-semibold text-foreground">Professor</th>
                  <th className="py-4 px-6 font-semibold text-foreground">Créditos atribuídos</th>
                  <th className="py-4 px-6 font-semibold text-foreground rounded-r-xl">Criado em</th>
                </tr>
              </thead>
              <tbody>
                {disciplinas.map((item, index) => (
                  <tr key={index} className="border-b border-transparent hover:bg-regular-100/30 transition-colors">
                    <td className="py-5 px-6 font-semibold text-foreground">{item.nome}</td>
                    <td className="py-5 px-6 font-medium text-regular-500">{item.professor}</td>
                    <td className="py-5 px-6 font-bold text-primary">{item.creditos}</td>
                    <td className="py-5 px-6 font-medium text-regular-500">{item.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end gap-2 mt-8 text-sm font-medium text-regular-400">
            <button className="px-2 py-1 hover:text-foreground">Previous</button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-regular-100 text-regular-500">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-regular-100 text-regular-500">3</button>
              <span className="px-1 text-regular-500">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-regular-100 text-regular-500">67</button>
            </div>
            <button className="px-2 py-1 hover:text-foreground">Next &gt;</button>
          </div>
        </div>
      </main>
    </div>
  )
}
