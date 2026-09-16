import { useState } from "react"
import { Link } from "react-router-dom"
import { Pencil, Trash2, Plus, Check } from "lucide-react"
import Navbar from "@/components/Navbar"
import Modal from "@/components/Modal"
import { Input } from "@/components/ui/input"
import { useDisciplinas } from "@/hooks/useDisciplinas"

export default function Disciplinas() {
  const { emCurso, adicionar, atualizar, remover, toggleConcluida, loading } = useDisciplinas()

  // Controle de Modais
  const [isAdicionarOpen, setIsAdicionarOpen] = useState(false)
  const [isEditarOpen, setIsEditarOpen] = useState(false)
  const [isExcluirOpen, setIsExcluirOpen] = useState(false)

  // Form state
  const [formAdd, setFormAdd] = useState({ nome: "", professor: "", creditos: "" })
  const [formEdit, setFormEdit] = useState({ id: null, nome: "", professor: "", creditos: "" })
  const [idExcluir, setIdExcluir] = useState(null)
  const [selecionadas, setSelecionadas] = useState([])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-paragraph text-muted-foreground">Carregando...</p>
      </div>
    )
  }

  function handleFormAddChange(campo, valor) {
    setFormAdd((prev) => ({ ...prev, [campo]: valor }))
  }

  async function handleAdicionar() {
    await adicionar({
      nome: formAdd.nome,
      professor: formAdd.professor,
      creditos: Number(formAdd.creditos),
      prerequisitos: [],
    })
    setFormAdd({ nome: "", professor: "", creditos: "" })
    setIsAdicionarOpen(false)
  }

  function abrirEditar(disciplina) {
    setFormEdit({
      id: disciplina.getId(),
      nome: disciplina.getNome(),
      professor: disciplina.getProfessor(),
      creditos: String(disciplina.getCreditos()),
    })
    setIsEditarOpen(true)
  }

  async function handleEditar() {
    await atualizar(formEdit.id, {
      nome: formEdit.nome,
      professor: formEdit.professor,
      creditos: Number(formEdit.creditos),
      prerequisitos: [],
    })
    setIsEditarOpen(false)
  }

  function abrirExcluir(id) {
    setIdExcluir(id)
    setIsExcluirOpen(true)
  }

  async function handleExcluir() {
    await remover(idExcluir)
    setIsExcluirOpen(false)
  }

  function toggleSelecionada(disciplina) {
  const id = disciplina.getId()

  setSelecionadas((prev) =>
    prev.includes(id)
      ? prev.filter((item) => item !== id)
      : [...prev, id]
  )
}

async function handleMarcarConcluidas() {
  for (const id of selecionadas) {
    const disciplina = emCurso.find((d) => d.getId() === id)

    if (disciplina && !disciplina.isConcluida()) {
      await toggleConcluida(disciplina)
    }
  }

  setSelecionadas([])
}


  return (
    <div className="min-h-screen bg-regular-200 pb-12 font-sans relative">
      <Navbar logado />

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

          {emCurso.length === 0 ? (
            <p className="text-regular-500">Nenhuma disciplina adicionada ainda.</p>
          ) : (
            <>
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
                    {emCurso.map((d) => (
                      <tr key={d.getId()} className="border-b border-transparent hover:bg-regular-100/30 transition-colors">
                        <td className="py-5 px-6">
                          <div
                            onClick={() => toggleSelecionada(d)}
                            className={`w-5 h-5 rounded flex items-center justify-center border-2 cursor-pointer transition-colors ${
                              selecionadas.includes(d.getId())
                                ? "bg-primary border-primary"
                                : "border-regular-400 bg-white hover:border-primary"
                            }`}
                          >
                            {selecionadas.includes(d.getId()) && (
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            )}
                          </div>
                        </td>
                        <td className="py-5 px-2 font-semibold text-foreground">{d.getNome()}</td>
                        <td className="py-5 px-6 font-medium text-regular-400">{d.getProfessor()}</td>
                        <td className="py-5 px-6 font-medium text-regular-400">{d.getCreditos()}/200</td>
                        <td className="py-5 px-6 font-medium text-regular-400">{d.getDataCriacaoFormatada()}</td>
                        <td className="py-5 px-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button
                              onClick={() => abrirEditar(d)}
                              className="text-primary hover:opacity-70 transition-opacity"
                            >
                              <Pencil className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => abrirExcluir(d.getId())}
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
                onClick={handleMarcarConcluidas}
                disabled={selecionadas.length === 0}
                className={`mt-4 flex w-fit items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                  selecionadas.length > 0
                    ? "bg-primary text-white hover:bg-primary/90 cursor-pointer"
                    : "text-regular-400 cursor-not-allowed"
                }`}
              >
                <Check className="w-5 h-5" />
                <span className="text-sm font-semibold">
                  Marcar como concluída
                </span>
              </button>
            </>
          )}
        </div>
      </main>

      {/* MODAL: Adicionar Disciplina */}
      <Modal isOpen={isAdicionarOpen} onClose={() => setIsAdicionarOpen(false)}>
        <h2 className="text-2xl font-bold text-foreground mb-6">Adicionar disciplina</h2>
        <div className="space-y-4 mb-8">
          <div>
            <label className="text-sm font-medium text-regular-600 mb-1 block">Nome</label>
            <Input
              className="h-12 rounded-xl"
              placeholder="Ex: Redes Neurais"
              value={formAdd.nome}
              onChange={(e) => handleFormAddChange("nome", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-regular-600 mb-1 block">Professor</label>
            <Input
              className="h-12 rounded-xl"
              placeholder="Ex: Cicrano Blau"
              value={formAdd.professor}
              onChange={(e) => handleFormAddChange("professor", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-regular-600 mb-1 block">Créditos atribuídos</label>
            <Input
              className="h-12 rounded-xl"
              placeholder="Ex: 200"
              value={formAdd.creditos}
              onChange={(e) => handleFormAddChange("creditos", e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setIsAdicionarOpen(false)} className="flex-1 bg-regular-200 text-[#004d30] hover:bg-regular-300 font-bold py-3.5 rounded-2xl transition-colors">
            Cancelar
          </button>
          <button onClick={handleAdicionar} className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-2xl transition-colors">
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
            <Input
              className="h-12 rounded-xl"
              value={formEdit.nome}
              onChange={(e) => setFormEdit((prev) => ({ ...prev, nome: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-regular-600 mb-1 block">Professor</label>
            <Input
              className="h-12 rounded-xl"
              value={formEdit.professor}
              onChange={(e) => setFormEdit((prev) => ({ ...prev, professor: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-regular-600 mb-1 block">Créditos atribuídos</label>
            <Input
              className="h-12 rounded-xl"
              value={formEdit.creditos}
              onChange={(e) => setFormEdit((prev) => ({ ...prev, creditos: e.target.value }))}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setIsEditarOpen(false)} className="flex-1 bg-regular-200 text-[#004d30] hover:bg-regular-300 font-bold py-3.5 rounded-2xl transition-colors">
            Cancelar
          </button>
          <button onClick={handleEditar} className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-2xl transition-colors">
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
          <button onClick={handleExcluir} className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-2xl transition-colors">
            Excluir
          </button>
        </div>
      </Modal>
    </div>
  )
}
