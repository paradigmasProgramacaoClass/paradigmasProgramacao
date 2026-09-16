import { describe, it, expect, vi, beforeEach } from 'vitest'

const mocksFirestore = vi.hoisted(() => ({
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  doc: vi.fn((...args) => ({ tipo: 'doc', args })),
}))

vi.mock('firebase/firestore', () => mocksFirestore)
vi.mock('@/config/firebase', () => ({ db: { __fake: 'db' } }))

const { getDoc, setDoc, doc } = mocksFirestore

const { default: AlunoService } = await import('@/services/AlunoService')
const { default: Aluno } = await import('@/models/Aluno')

const UID = 'uid-teste-456'

const perfil = {
  nome: 'Marcelo Carvalho',
  email: 'marcelo@exemplo.com',
  curso: 'Ciência da Computação',
  periodo: 5,
  creditosNecessarios: 1000,
}

/** Documento do Firestore (users/{uid}) que existe. */
function docExistente(dados) {
  return { exists: () => true, data: () => dados }
}

/** Documento inexistente (primeiro acesso). */
function docInexistente() {
  return { exists: () => false, data: () => undefined }
}

/** DisciplinaService falso — só o que o AlunoService consome. */
function disciplinaServiceFalso(disciplinas = []) {
  return { listar: vi.fn().mockResolvedValue(disciplinas) }
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('AlunoService — caminho do documento', () => {
  it('aponta para users/{uid}', async () => {
    getDoc.mockResolvedValue(docInexistente())
    const service = new AlunoService(UID, disciplinaServiceFalso())

    await service.buscar()

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'users', UID)
  })
})

describe('AlunoService — salvar', () => {
  it('grava via setDoc com o perfil serializado', async () => {
    setDoc.mockResolvedValue(undefined)
    const service = new AlunoService(UID, disciplinaServiceFalso())

    await service.salvar(new Aluno(perfil))

    expect(setDoc).toHaveBeenCalledTimes(1)
    expect(setDoc.mock.calls[0][1]).toEqual(perfil)
  })

  it('propaga o erro se a escrita falhar', async () => {
    setDoc.mockRejectedValue(new Error('permission-denied'))
    const service = new AlunoService(UID, disciplinaServiceFalso())

    await expect(service.salvar(new Aluno(perfil))).rejects.toThrow('permission-denied')
  })
})

describe('AlunoService — buscar', () => {
  it('reidrata o perfil como Aluno', async () => {
    getDoc.mockResolvedValue(docExistente(perfil))
    const service = new AlunoService(UID, disciplinaServiceFalso())

    const aluno = await service.buscar()

    expect(aluno).toBeInstanceOf(Aluno)
    expect(aluno.getNome()).toBe('Marcelo Carvalho')
    expect(aluno.getCreditosNecessarios()).toBe(1000)
  })

  it('devolve null quando o perfil ainda não existe (primeiro acesso)', async () => {
    getDoc.mockResolvedValue(docInexistente())
    const service = new AlunoService(UID, disciplinaServiceFalso())

    expect(await service.buscar()).toBeNull()
  })
})

describe('AlunoService — creditosConcluidos', () => {
  it('soma apenas os créditos das disciplinas concluídas', async () => {
    const disciplinas = [
      { isConcluida: () => true, getCreditos: () => 40 },
      { isConcluida: () => true, getCreditos: () => 60 },
      { isConcluida: () => false, getCreditos: () => 100 },
    ]
    const service = new AlunoService(UID, disciplinaServiceFalso(disciplinas))

    expect(await service.creditosConcluidos()).toBe(100)
  })

  it('devolve 0 quando nada foi concluído', async () => {
    const disciplinas = [
      { isConcluida: () => false, getCreditos: () => 100 },
    ]
    const service = new AlunoService(UID, disciplinaServiceFalso(disciplinas))

    expect(await service.creditosConcluidos()).toBe(0)
  })

  it('devolve 0 quando não há disciplinas', async () => {
    const service = new AlunoService(UID, disciplinaServiceFalso([]))

    expect(await service.creditosConcluidos()).toBe(0)
  })

  it('delega a leitura das disciplinas ao DisciplinaService', async () => {
    const fake = disciplinaServiceFalso([])
    const service = new AlunoService(UID, fake)

    await service.creditosConcluidos()

    expect(fake.listar).toHaveBeenCalledTimes(1)
  })
})

describe('AlunoService — creditosRestantes', () => {
  function comPerfilE(disciplinas) {
    getDoc.mockResolvedValue(docExistente(perfil)) // creditosNecessarios: 1000
    return new AlunoService(UID, disciplinaServiceFalso(disciplinas))
  }

  it('subtrai os créditos concluídos do total necessário', async () => {
    const service = comPerfilE([
      { isConcluida: () => true, getCreditos: () => 250 },
    ])

    expect(await service.creditosRestantes()).toBe(750)
  })

  it('devolve o total quando nada foi concluído', async () => {
    const service = comPerfilE([])

    expect(await service.creditosRestantes()).toBe(1000)
  })

  it('nunca devolve negativo quando os créditos ultrapassam o necessário', async () => {
    const service = comPerfilE([
      { isConcluida: () => true, getCreditos: () => 1500 },
    ])

    expect(await service.creditosRestantes()).toBe(0)
  })

  it('devolve 0 quando o perfil não existe', async () => {
    getDoc.mockResolvedValue(docInexistente())
    const service = new AlunoService(UID, disciplinaServiceFalso([]))

    expect(await service.creditosRestantes()).toBe(0)
  })

  it('busca o perfil a cada chamada (não guarda cache)', async () => {
    const service = comPerfilE([])

    await service.creditosRestantes()
    await service.creditosRestantes()

    expect(getDoc).toHaveBeenCalledTimes(2)
  })
})
