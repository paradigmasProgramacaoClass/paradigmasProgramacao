import { useState } from "react"
import { Link } from "react-router-dom"
import { Pencil, Trash2, Plus } from "lucide-react"
import Navbar from "@/components/Navbar"
import Modal from "@/components/Modal"
import { Input } from "@/components/ui/input"

const atividades = [
  { nome: "Atividade prática", valor: "50", tipo: "Semestral", autor: "Sistema", editavel: false },
  { nome: "Atividade teórica", valor: "50", tipo: "Semestral", autor: "Sistema", editavel: false },
  { nome: "Prova avaliativa", valor: "100", tipo: "Avaliativo", autor: "Sistema", editavel: false },
  { nome: "Prova extra 28/06", valor: "100", tipo: "Avaliativo", autor: "Usuário", editavel: true },
]

export default function MinhasAtividades() {
  const [isAdicionarOpen, setIsAdicionarOpen] = useState(false)
  const [isEditarOpen, setIsEditarOpen] = useState(false)
  const [isExcluirOpen, setIsExcluirOpen] = useState(false)
  const [isAtribuirOpen, setIsAtribuirOpen] = useState(false)

  return (
    <div className="min-h-screen bg-regular-200 pb-12 font-sans">
      <Navbar logado nomeUsuario="Fulano de Tal" />

      <main className="max-w-6xl mx-auto px-6 mt-8">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-semibold text-primary hover:underline mb-6"
        >
          &lt; Retornar
        </Link>

        {/* Card Principal */}
        <div className="bg-white rounded-[2rem] border border-border p-10 shadow-sm min-h-[500px]">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">Minhas atividades</h1>
              <p className="text-sm font-medium text-regular-500">
                Créditos totais e atribuídos a disciplinas.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={() => setIsAdicionarOpen(true)}
                className="flex items-center gap-2 px-6 py-2.5 border-2 border-primary text-primary hover:bg-primary/5 text-sm font-bold rounded-full transition-colors"
              >
                <Plus className="w-4 h-4" />
                Adicionar atividade
              </button>
              <button 
                onClick={() => setIsAtribuirOpen(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-full transition-colors"
              >
                <Plus className="w-4 h-4" />
                Atribuir atividade
              </button>
            </div>
          </div>

          {/* Tabela */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-regular-100/50 rounded-xl">
                <tr>
                  <th className="py-4 px-6 font-semibold text-foreground rounded-l-xl">Nome</th>
                  <th className="py-4 px-6 font-semibold text-foreground">Valor</th>
                  <th className="py-4 px-6 font-semibold text-foreground">Tipo</th>
                  <th className="py-4 px-6 font-semibold text-foreground rounded-r-xl">Adicionado por</th>
                  <th className="py-4 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {atividades.map((item, index) => (
                  <tr key={index} className="border-b border-transparent hover:bg-regular-100/30 transition-colors">
                    <td className="py-5 px-6 font-semibold text-foreground">{item.nome}</td>
                    <td className="py-5 px-6 font-bold text-primary">{item.valor}</td>
                    <td className="py-5 px-6 font-medium text-regular-400">{item.tipo}</td>
                    <td className="py-5 px-6 font-medium text-regular-400">{item.autor}</td>
                    <td className="py-5 px-6 text-right">
                      {item.editavel && (
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
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* MODAL: Adicionar / Editar Atividade */}
      <Modal isOpen={isAdicionarOpen || isEditarOpen} onClose={() => { setIsAdicionarOpen(false); setIsEditarOpen(false); }}>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          {isEditarOpen ? "Editar atividade" : "Adicionar atividade"}
        </h2>
        <div className="space-y-4 mb-8">
          <div>
            <label className="text-sm font-medium text-regular-600 mb-1 block">Nome</label>
            <Input className="h-12 rounded-xl" placeholder="Ex: Prova extra 28/06" defaultValue={isEditarOpen ? "Prova extra 28/06" : ""} />
          </div>
          <div>
            <label className="text-sm font-medium text-regular-600 mb-1 block">Valor</label>
            <Input className="h-12 rounded-xl" placeholder="Ex: 100" defaultValue={isEditarOpen ? "100" : ""} />
          </div>
          <div>
            <label className="text-sm font-medium text-regular-600 mb-1 block">Tipo</label>
            <select className="w-full border border-regular-300 rounded-xl h-12 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="Avaliativo">Avaliativo</option>
              <option value="Semestral">Semestral</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => { setIsAdicionarOpen(false); setIsEditarOpen(false); }} 
            className="flex-1 bg-regular-200 text-[#004d30] hover:bg-regular-300 font-bold py-3.5 rounded-2xl transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={() => { setIsAdicionarOpen(false); setIsEditarOpen(false); }} 
            className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-2xl transition-colors"
          >
            Salvar
          </button>
        </div>
      </Modal>

      {/* MODAL: Atribuir Atividade */}
      <Modal isOpen={isAtribuirOpen} onClose={() => setIsAtribuirOpen(false)}>
        <h2 className="text-2xl font-bold text-foreground mb-6">Atribuir atividade</h2>
        <div className="space-y-4 mb-8">
          <div>
            <label className="text-sm font-medium text-regular-600 mb-1 block">Selecione a atividade</label>
            <select className="w-full border border-regular-300 rounded-xl h-12 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>Prova extra 28/06</option>
              <option>Prova avaliativa</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-regular-600 mb-1 block">Selecione a disciplina</label>
            <select className="w-full border border-regular-300 rounded-xl h-12 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>Redes Neurais</option>
              <option>Paradigmas de Programação</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setIsAtribuirOpen(false)} className="flex-1 bg-regular-200 text-[#004d30] hover:bg-regular-300 font-bold py-3.5 rounded-2xl transition-colors">
            Cancelar
          </button>
          <button onClick={() => setIsAtribuirOpen(false)} className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-2xl transition-colors">
            Atribuir
          </button>
        </div>
      </Modal>

      {/* MODAL: Excluir Atividade */}
      <Modal isOpen={isExcluirOpen} onClose={() => setIsExcluirOpen(false)}>
        <h2 className="text-2xl font-bold text-foreground mb-4">Excluir atividade</h2>
        <p className="text-regular-500 font-medium text-base mb-8">
          Deseja excluir a atividade selecionada?
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
