import { describe, it, expect, vi, beforeEach } from 'vitest'

// --- Mocks do Firestore (nada toca a rede: nunca carrega src/config/firebase.js real) ---
const mocksFirestore = vi.hoisted(() => ({
  addDoc: vi.fn(),
  getDocs: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  collection: vi.fn((...args) => ({ tipo: 'collection', args })),
  doc: vi.fn((...args) => ({ tipo: 'doc', args })),
}))

vi.mock('firebase/firestore', () => mocksFirestore)
vi.mock('@/config/firebase', () => ({ db: { __fake: 'db' } }))

const {
  addDoc, getDocs, updateDoc, deleteDoc, collection, doc,
} = mocksFirestore

const { default: DisciplinaService } = await import('@/services/DisciplinaService')
const { default: Disciplina } = await import('@/models/Disciplina')

const UID = 'uid-teste-123'

/** Snapshot falso no formato que getDocs devolve. */
function snapshot(docs) {
  return { docs: docs.map(({ id, ...dados }) => ({ id, data: () => dados })) }
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('DisciplinaService — caminho no Firestore', () => {
  it('monta a subcollection users/{uid}/disciplinas', async () => {
    getDocs.mockResolvedValue(snapshot([]))
    const service = new DisciplinaService(UID)

    await service.listar()

    expect(collection).toHaveBeenCalledWith(
      expect.anything(), 'users', UID, 'disciplinas'
    )
  })

  it('monta o document ref com o id da disciplina', async () => {
    updateDoc.mockResolvedValue(undefined)
    const service = new DisciplinaService(UID)

    await service.atualizar('doc-9', new Disciplina('X', 10))

    expect(doc).toHaveBeenCalledWith(
      expect.anything(), 'users', UID, 'disciplinas', 'doc-9'
    )
  })
})

describe('DisciplinaService — adicionar', () => {
  it('grava via addDoc e devolve o id gerado', async () => {
    addDoc.mockResolvedValue({ id: 'novo-doc' })
    const service = new DisciplinaService(UID)
    const d = new Disciplina('Compiladores', 60, ['Algoritmos'], 'Cicrano Blau')

    const id = await service.adicionar(d)

    expect(id).toBe('novo-doc')
    expect(addDoc).toHaveBeenCalledTimes(1)
    // 2º argumento é o payload serializado
    expect(addDoc.mock.calls[0][1]).toEqual({
      nome: 'Compiladores',
      creditos: 60,
      concluida: false,
      prerequisitos: ['Algoritmos'],
      professor: 'Cicrano Blau',
      dataCriacao: expect.any(String),
    })
  })

  it('propaga o erro se o Firestore falhar', async () => {
    addDoc.mockRejectedValue(new Error('permission-denied'))
    const service = new DisciplinaService(UID)

    await expect(service.adicionar(new Disciplina('X', 1))).rejects.toThrow('permission-denied')
  })
})

describe('DisciplinaService — listar', () => {
  it('reidrata cada documento como Disciplina, com o id do documento', async () => {
    getDocs.mockResolvedValue(
      snapshot([
        { id: 'd1', nome: 'Compiladores', creditos: 60, concluida: true, prerequisitos: [], professor: 'A', dataCriacao: '2026-01-01T00:00:00.000Z' },
        { id: 'd2', nome: 'Redes', creditos: 40, concluida: false, prerequisitos: ['Compiladores'], professor: 'B', dataCriacao: '2026-01-02T00:00:00.000Z' },
      ])
    )
    const service = new DisciplinaService(UID)

    const lista = await service.listar()

    expect(lista).toHaveLength(2)
    expect(lista[0]).toBeInstanceOf(Disciplina)
    expect(lista[0].getId()).toBe('d1')
    expect(lista[0].getNome()).toBe('Compiladores')
    expect(lista[0].isConcluida()).toBe(true)
    expect(lista[1].getId()).toBe('d2')
    expect(lista[1].getPrerequisitos()).toEqual(['Compiladores'])
  })

  it('devolve array vazio quando a subcollection não tem documentos', async () => {
    getDocs.mockResolvedValue(snapshot([]))
    const service = new DisciplinaService(UID)

    expect(await service.listar()).toEqual([])
  })

  it('tolera documento legado sem os campos novos', async () => {
    getDocs.mockResolvedValue(snapshot([{ id: 'velho', nome: 'Legada', creditos: 30 }]))
    const service = new DisciplinaService(UID)

    const [d] = await service.listar()

    expect(d.getNome()).toBe('Legada')
    expect(d.getProfessor()).toBe('')
    expect(d.getPrerequisitos()).toEqual([])
    expect(d.isConcluida()).toBe(false)
  })
})

describe('DisciplinaService — atualizar', () => {
  it('envia o documento serializado', async () => {
    updateDoc.mockResolvedValue(undefined)
    const service = new DisciplinaService(UID)
    const d = new Disciplina('Redes II', 50, [], 'Novo Prof', 'doc-1')

    await service.atualizar('doc-1', d)

    expect(updateDoc.mock.calls[0][1]).toEqual({
      nome: 'Redes II',
      creditos: 50,
      concluida: false,
      prerequisitos: [],
      professor: 'Novo Prof',
      dataCriacao: expect.any(String),
    })
  })
})

describe('DisciplinaService — remover', () => {
  it('chama deleteDoc no documento certo', async () => {
    deleteDoc.mockResolvedValue(undefined)
    const service = new DisciplinaService(UID)

    await service.remover('doc-7')

    expect(deleteDoc).toHaveBeenCalledTimes(1)
    expect(doc).toHaveBeenCalledWith(
      expect.anything(), 'users', UID, 'disciplinas', 'doc-7'
    )
  })
})

describe('DisciplinaService — toggleConcluida', () => {
  it('marca e persiste concluida=true (o model é a fonte de verdade)', async () => {
    updateDoc.mockResolvedValue(undefined)
    const service = new DisciplinaService(UID)
    const d = new Disciplina('Redes', 40, [], '', 'doc-1')

    await service.toggleConcluida(d)

    expect(d.isConcluida()).toBe(true)
    expect(updateDoc.mock.calls[0][1]).toEqual({ concluida: true })
  })

  it('inverte de concluída para não concluída', async () => {
    updateDoc.mockResolvedValue(undefined)
    const service = new DisciplinaService(UID)
    const d = new Disciplina('Redes', 40, [], '', 'doc-1')
    d.marcarConcluida()

    await service.toggleConcluida(d)

    expect(d.isConcluida()).toBe(false)
    expect(updateDoc.mock.calls[0][1]).toEqual({ concluida: false })
  })

  it('persiste só o campo concluida, sem sobrescrever o resto do documento', async () => {
    updateDoc.mockResolvedValue(undefined)
    const service = new DisciplinaService(UID)
    const d = new Disciplina('Redes', 40, ['Cálculo'], 'Cicrano', 'doc-1')

    await service.toggleConcluida(d)

    expect(Object.keys(updateDoc.mock.calls[0][1])).toEqual(['concluida'])
  })

  it('propaga o erro se o update falhar', async () => {
    updateDoc.mockRejectedValue(new Error('offline'))
    const service = new DisciplinaService(UID)

    await expect(service.toggleConcluida(new Disciplina('X', 1, [], '', 'd1'))).rejects.toThrow('offline')
  })
})

describe('DisciplinaService — listarDisponiveis', () => {
  /** Atalho: grava os documentos que o getDocs vai devolver. */
  function comDisciplinas(docs) {
    getDocs.mockResolvedValue(snapshot(docs))
    return new DisciplinaService(UID)
  }

  it('exclui as já concluídas', async () => {
    const service = comDisciplinas([
      { id: 'd1', nome: 'Feita', creditos: 40, concluida: true, prerequisitos: [] },
      { id: 'd2', nome: 'Pendente', creditos: 40, concluida: false, prerequisitos: [] },
    ])

    const disponiveis = await service.listarDisponiveis()

    expect(disponiveis.map((d) => d.getNome())).toEqual(['Pendente'])
  })

  it('libera a disciplina quando todos os pré-requisitos estão concluídos', async () => {
    const service = comDisciplinas([
      { id: 'd1', nome: 'Algoritmos', creditos: 40, concluida: true, prerequisitos: [] },
      { id: 'd2', nome: 'Compiladores', creditos: 60, concluida: false, prerequisitos: ['Algoritmos'] },
    ])

    const disponiveis = await service.listarDisponiveis()

    expect(disponiveis.map((d) => d.getNome())).toEqual(['Compiladores'])
  })

  it('bloqueia a disciplina quando um pré-requisito não foi concluído', async () => {
    const service = comDisciplinas([
      { id: 'd1', nome: 'Algoritmos', creditos: 40, concluida: false, prerequisitos: [] },
      { id: 'd2', nome: 'Compiladores', creditos: 60, concluida: false, prerequisitos: ['Algoritmos'] },
    ])

    const disponiveis = await service.listarDisponiveis()

    // Só Algoritmos está disponível; Compiladores está bloqueada
    expect(disponiveis.map((d) => d.getNome())).toEqual(['Algoritmos'])
  })

  it('exige TODOS os pré-requisitos (E lógico, não OU)', async () => {
    const service = comDisciplinas([
      { id: 'd1', nome: 'Algoritmos', creditos: 40, concluida: true, prerequisitos: [] },
      { id: 'd2', nome: 'Cálculo', creditos: 40, concluida: false, prerequisitos: [] },
      { id: 'd3', nome: 'Compiladores', creditos: 60, concluida: false, prerequisitos: ['Algoritmos', 'Cálculo'] },
    ])

    const disponiveis = await service.listarDisponiveis()

    // Cálculo ainda não foi concluído -> Compiladores continua bloqueada
    expect(disponiveis.map((d) => d.getNome())).not.toContain('Compiladores')
  })

  it('trata disciplina sem pré-requisitos como sempre disponível', async () => {
    const service = comDisciplinas([
      { id: 'd1', nome: 'Livre', creditos: 30, concluida: false, prerequisitos: [] },
    ])

    const disponiveis = await service.listarDisponiveis()

    expect(disponiveis.map((d) => d.getNome())).toEqual(['Livre'])
  })

  it('devolve vazio quando todas estão concluídas', async () => {
    const service = comDisciplinas([
      { id: 'd1', nome: 'A', creditos: 10, concluida: true, prerequisitos: [] },
      { id: 'd2', nome: 'B', creditos: 10, concluida: true, prerequisitos: [] },
    ])

    expect(await service.listarDisponiveis()).toEqual([])
  })

  it('devolve vazio quando não há disciplinas', async () => {
    expect(await comDisciplinas([]).listarDisponiveis()).toEqual([])
  })

  it('faz uma única leitura do Firestore por chamada', async () => {
    const service = comDisciplinas([])
    await service.listarDisponiveis()
    expect(getDocs).toHaveBeenCalledTimes(1)
  })
})
