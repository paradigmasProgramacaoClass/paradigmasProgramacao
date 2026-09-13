import { useState } from "react"
import { Link } from "react-router-dom"
import { Pencil, Trash2, Plus, Check, Info } from "lucide-react"
import Navbar from "@/components/Navbar"
import Modal from "@/components/Modal"
import { Input } from "@/components/ui/input"

const disciplinasIniciais = [
  { nome: "Redes Neurais", professor: "Professor Cicrano Blau", creditos: "50/200", data: "26/03/2026", selecionada: true },
  { nome: "Microcontroladores...", professor: "Professor Cicrano Blau", creditos: "50/200", data: "26/03/2026", selecionada: false },
]

export default function Disciplinas() {
  const [disciplinas, setDisciplinas] = useState(disciplinasIniciais)
  
  // Controle de Modais
  const [isAdicionarOpen, setIsAdicionarOpen] = useState(false)
  const [isEditarOpen, setIsEditarOpen] = useState(false)
  const [isExcluirOpen, setIsExcluirOpen] = useState(false)

  function toggleSelecionada(index) {
    // Paradigma Imperativo: Controle de fluxo passo a passo
    const novasDisciplinas = []; // Passo 1: Criação de um novo array vazio

    // Passo 2: Iteração explícita com loop for clássico
    for (let i = 0; i < disciplinas.length; i++) {
      // Passo 3: Criar uma cópia isolada do objeto atual
      const disciplinaAtual = { ...disciplinas[i] };

      // Passo 4: Checar se o índice atual é o que o usuário clicou
      if (i === index) {
        // Passo 5: Instrução explícita de inversão de estado
        if (disciplinaAtual.selecionada === true) {
          disciplinaAtual.selecionada = false;
        } else {
          disciplinaAtual.selecionada = true;
        }
      }

      // Passo 6: Adicionar o objeto à nova lista
      novasDisciplinas.push(disciplinaAtual);
    }

    // Passo 7: Atualizar o estado geral
    setDisciplinas(novasDisciplinas);
  }

  const temSelecionada = disciplinas.some((d) => d.selecionada)

  return (
    <div className="min-h-screen bg-regular-200 pb-12 font-sans relative">
      <Navbar logado nomeUsuario="Fulano de Tal" />

      {/* Segmented Control (Toggle) Centralizado */}
      <div className="absolute top-[88px] left-1/2 -translate-x-1/2 flex items-center bg-regular-300/40 rounded-full p-1 z-10">
        <button className="px-6 py-2 rounded-full text-sm font-semibold bg-primary text-white shadow-sm transition-colors cursor-default">
          Em curso
        </button>
        <Link to="/disciplinas-concluidas" className="px-6 py-2 rounded-full text-sm font-semibold text-regular-600 hover:text-foreground transition-colors">
          Concluídas
        </Link>
      </div>

      <main className="max-w-6xl mx-auto px-6 mt-16">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-semibold text-primary hover:underline mb-6"
        >
          &lt; Retornar
        </Link>

        {/* Card Principal */}
        <div className="bg-white rounded-[2rem] border border-border p-10 shadow-sm min-h-[500px] flex flex-col">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">Disciplinas adicionadas</h1>
              <p className="text-sm font-medium text-regular-500">
                Disciplinas adicionadas neste período.
              </p>
            </div>
            <button 
              onClick={() => setIsAdicionarOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-full transition-colors"
            >
              <Plus className="w-4 h-4" />
              Adicionar disciplina
            </button>
          </div>

          {/* Tabela */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-regular-100/50 rounded-xl">
                <tr>
                  <th className="py-4 px-6 rounded-l-xl w-12"></th>
                  <th className="py-4 px-2 font-semibold text-foreground">Nome</th>
                  <th className="py-4 px-6 font-semibold text-foreground">Professor</th>
                  <th className="py-4 px-6 font-semibold text-foreground">Créditos atribuídos</th>
                  <th className="py-4 px-6 font-semibold text-foreground rounded-r-xl">Criado em</th>
                  <th className="py-4 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {disciplinas.map((item, index) => (
                  <tr key={index} className="border-b border-transparent hover:bg-regular-100/30 transition-colors">
                    <td className="py-5 px-6">
                      <div 
                        onClick={() => toggleSelecionada(index)}
                        className={`w-5 h-5 rounded flex items-center justify-center border-2 cursor-pointer transition-colors ${item.selecionada ? 'bg-primary border-primary' : 'border-regular-400 bg-white hover:border-primary'}`}
                      >
                        {item.selecionada && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                      </div>
                    </td>
                    <td className="py-5 px-2 font-semibold text-foreground">{item.nome}</td>
                    <td className="py-5 px-6 font-medium text-regular-400">{item.professor}</td>
                    <td className="py-5 px-6 font-medium text-regular-400">{item.creditos}</td>
                    <td className="py-5 px-6 font-medium text-regular-400">{item.data}</td>
                    <td className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => setIsEditarOpen(true)}
                          className="text-primary hover:opacity-70 transition-opacity"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => setIsExcluirOpen(true)}
                          className="text-red-500 hover:opacity-70 transition-opacity"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button 
            disabled={!temSelecionada}
            className={`mt-4 flex w-fit items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
              temSelecionada 
                ? 'bg-primary/10 text-primary cursor-pointer hover:bg-primary/20' 
                : 'text-regular-400 cursor-not-allowed'
            }`}
          >
            <Check className="w-5 h-5" />
            <span className="text-sm font-semibold">Marcar como concluída</span>
          </button>

          <div className="mt-8 flex items-center gap-2 bg-regular-100/50 p-4 rounded-xl border border-red-100">
            <Info className="w-5 h-5 text-red-500 shrink-0" />
            <p className="text-sm font-semibold text-red-500">
              Apenas disciplinas com a contagem de créditos finalizada podem ser marcadas como concluídas.
            </p>
          </div>
        </div>
      </main>

      {/* MODAL: Adicionar Disciplina */}
      <Modal isOpen={isAdicionarOpen} onClose={() => setIsAdicionarOpen(false)}>
        <h2 className="text-2xl font-bold text-foreground mb-6">Adicionar disciplina</h2>
        <div className="space-y-4 mb-8">
          <div>
            <label className="text-sm font-medium text-regular-600 mb-1 block">Nome</label>
            <Input className="h-12 rounded-xl" placeholder="Ex: Redes Neurais" />
          </div>
          <div>
            <label className="text-sm font-medium text-regular-600 mb-1 block">Professor</label>
            <Input className="h-12 rounded-xl" placeholder="Ex: Cicrano Blau" />
          </div>
          <div>
            <label className="text-sm font-medium text-regular-600 mb-1 block">Créditos atribuídos</label>
            <Input className="h-12 rounded-xl" placeholder="Ex: 200" />
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setIsAdicionarOpen(false)} className="flex-1 bg-regular-200 text-[#004d30] hover:bg-regular-300 font-bold py-3.5 rounded-2xl transition-colors">
            Cancelar
          </button>
          <button onClick={() => setIsAdicionarOpen(false)} className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-2xl transition-colors">
            Salvar
          </button>
        </div>
      </Modal>

      {/* MODAL: Editar Disciplina */}
      <Modal isOpen={isEditarOpen} onClose={() => setIsEditarOpen(false)}>
        <h2 className="text-2xl font-bold text-foreground mb-6">Editar disciplina</h2>
        <div className="space-y-4 mb-8">
          <div>
            <label className="text-sm font-medium text-regular-600 mb-1 block">Nome</label>
            <Input className="h-12 rounded-xl" defaultValue="Redes Neurais" />
          </div>
          <div>
            <label className="text-sm font-medium text-regular-600 mb-1 block">Professor</label>
            <Input className="h-12 rounded-xl" defaultValue="Cicrano Blau" />
          </div>
          <div>
            <label className="text-sm font-medium text-regular-600 mb-1 block">Créditos atribuídos</label>
            <Input className="h-12 rounded-xl" defaultValue="200" />
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setIsEditarOpen(false)} className="flex-1 bg-regular-200 text-[#004d30] hover:bg-regular-300 font-bold py-3.5 rounded-2xl transition-colors">
            Cancelar
          </button>
          <button onClick={() => setIsEditarOpen(false)} className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-2xl transition-colors">
            Salvar
          </button>
        </div>
      </Modal>

      {/* MODAL: Excluir Disciplina */}
      <Modal isOpen={isExcluirOpen} onClose={() => setIsExcluirOpen(false)}>
        <h2 className="text-2xl font-bold text-foreground mb-4">Excluir disciplina</h2>
        <p className="text-regular-500 font-medium text-base mb-8">
          Deseja excluir a disciplina selecionada?
        </p>
        <div className="flex gap-4">
          <button onClick={() => setIsExcluirOpen(false)} className="flex-1 bg-regular-200 text-[#004d30] hover:bg-regular-300 font-bold py-3.5 rounded-2xl transition-colors">
            Cancelar
          </button>
          <button onClick={() => setIsExcluirOpen(false)} className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-2xl transition-colors">
            Excluir
          </button>
        </div>
      </Modal>
    </div>
  )
}
