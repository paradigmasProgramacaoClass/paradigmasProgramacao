import { Link } from "react-router-dom"
import { Check, ChevronUp, ChevronDown, Book, BarChart2, Wallet } from "lucide-react"
import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-regular-200 pb-12 font-sans">
      <Navbar logado nomeUsuario="Fulano de Tal" />

      <main className="max-w-6xl mx-auto px-6 mt-8">
        
        {/* Card Principal: Disciplinas em curso */}
        <div className="bg-white rounded-[2rem] border border-border p-8 md:p-10 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">Disciplinas em curso</h1>
              <p className="text-sm font-medium text-regular-500">
                Ciência da Computação - 6º período
              </p>
            </div>
            <div className="text-right">
              <div className="mb-1">
                <span className="text-3xl font-semibold tracking-tight text-primary">306</span>
                <span className="text-3xl font-semibold tracking-tight text-regular-400">/1000</span>
              </div>
              <Link to="/meus-creditos" className="text-sm font-bold text-primary hover:underline underline-offset-2">
                Ver meus créditos
              </Link>
            </div>
          </div>

          <div className="space-y-8">
            {/* Disciplina 1 - Expandida e Completa */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">Paradigmas de Programação</span>
                  <Check className="w-5 h-5 text-primary" strokeWidth={3} />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold"><span className="text-primary">200</span> <span className="text-regular-500 font-medium">/ 200</span></span>
                  <ChevronUp className="w-5 h-5 text-primary cursor-pointer" />
                </div>
              </div>
              <div className="w-full bg-regular-200 rounded-full h-3 mb-4">
                <div className="bg-primary h-3 rounded-full" style={{ width: "100%" }} />
              </div>
              <div className="flex items-center justify-between">
                <button className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-full transition-colors">
                  Concluir disciplina
                </button>
                <Link to="#" className="text-sm font-bold text-primary hover:underline">
                  Visualizar disciplina &gt;
                </Link>
              </div>
            </div>

            {/* Disciplina 2 - Expandida e Incompleta */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-foreground">Redes Neurais</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold"><span className="text-primary">50</span> <span className="text-regular-500 font-medium">/ 250</span></span>
                  <ChevronUp className="w-5 h-5 text-primary cursor-pointer" />
                </div>
              </div>
              <div className="w-full bg-regular-200 rounded-full h-3 mb-4">
                <div className="bg-primary h-3 rounded-full" style={{ width: "20%" }} />
              </div>
              <div className="flex items-center justify-between">
                <button className="px-6 py-2.5 bg-regular-200 text-white text-sm font-semibold rounded-full cursor-not-allowed">
                  Concluir disciplina
                </button>
                <Link to="#" className="text-sm font-bold text-primary hover:underline">
                  Visualizar disciplina &gt;
                </Link>
              </div>
            </div>

            {/* Disciplina 3 - Colapsada */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-foreground">Microcontroladores e Microprocessadores</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold"><span className="text-primary">50</span> <span className="text-regular-500 font-medium">/ 250</span></span>
                  <ChevronDown className="w-5 h-5 text-primary cursor-pointer" />
                </div>
              </div>
              <div className="w-full bg-regular-200 rounded-full h-3">
                <div className="bg-primary h-3 rounded-full" style={{ width: "20%" }} />
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="text-sm font-bold text-primary hover:underline">
              Ver mais
            </button>
          </div>
        </div>

        {/* Ações Rápidas */}
        <h2 className="text-xl font-bold text-foreground mb-4">Ações rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
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
                <h3 className="text-lg font-bold text-foreground">Minhas atividades</h3>
                <BarChart2 className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-regular-500 font-medium leading-relaxed">
                Acesse e atribua atividades a disciplinas.
              </p>
            </div>
            <Link to="/atividades" className="text-sm font-bold text-primary hover:underline mt-4">
              Visualizar &gt;
            </Link>
          </div>

          {/* Ação 3 */}
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
