import { describe, it, expect } from 'vitest'
import Disciplina from '@/models/Disciplina'

describe('Disciplina — construtor', () => {
  it('usa valores padrão quando só nome e créditos são passados', () => {
    const d = new Disciplina('Redes Neurais', 40)

    expect(d.getId()).toBeNull()
    expect(d.getPrerequisitos()).toEqual([])
    expect(d.getProfessor()).toBe('')
    expect(d.isConcluida()).toBe(false)
  })

  it('gera dataCriacao em ISO quando não informada', () => {
    const d = new Disciplina('Redes Neurais', 40)

    // Formato ISO 8601 completo
    expect(d.getDataCriacao()).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    expect(new Date(d.getDataCriacao()).getTime()).not.toBeNaN()
  })

  it('respeita todos os argumentos posicionais na ordem declarada', () => {
    const criadaEm = '2026-03-01T10:00:00.000Z'
    const d = new Disciplina('Compiladores', 60, ['Algoritmos'], 'Cicrano Blau', 'doc-1', criadaEm)

    expect(d.getNome()).toBe('Compiladores')
    expect(d.getCreditos()).toBe(60)
    expect(d.getPrerequisitos()).toEqual(['Algoritmos'])
    expect(d.getProfessor()).toBe('Cicrano Blau')
    expect(d.getId()).toBe('doc-1')
    expect(d.getDataCriacao()).toBe(criadaEm)
  })

  it('nunca cria já concluída, mesmo com dataCriacao antiga', () => {
    const d = new Disciplina('Antiga', 10, [], '', null, '2020-01-01T00:00:00.000Z')
    expect(d.isConcluida()).toBe(false)
  })
})

describe('Disciplina — estado de conclusão', () => {
  it('marcarConcluida e desmarcarConcluida invertem o estado', () => {
    const d = new Disciplina('Redes', 40)

    d.marcarConcluida()
    expect(d.isConcluida()).toBe(true)

    d.desmarcarConcluida()
    expect(d.isConcluida()).toBe(false)
  })

  it('é idempotente ao marcar duas vezes', () => {
    const d = new Disciplina('Redes', 40)

    d.marcarConcluida()
    d.marcarConcluida()

    expect(d.isConcluida()).toBe(true)
  })
})

describe('Disciplina — encapsulamento', () => {
  it('não expõe os campos privados como propriedades públicas', () => {
    const d = new Disciplina('Redes', 40)

    // Campos com # não são acessíveis de fora — só via getters
    expect(Object.keys(d)).toEqual([])
    expect(d.nome).toBeUndefined()
    expect(d.creditos).toBeUndefined()
    expect(d.concluida).toBeUndefined()
  })

  it('getPrerequisitos devolve o array interno (não uma cópia)', () => {
    // Comportamento documentado: o service usa o array pra checar pré-requisitos.
    // Se um dia virar cópia defensiva, este teste quebra de propósito.
    const prereqs = ['Algoritmos']
    const d = new Disciplina('Compiladores', 60, prereqs)

    expect(d.getPrerequisitos()).toBe(prereqs)
  })
})

describe('Disciplina — toJSON', () => {
  it('serializa os campos do documento do Firestore', () => {
    const criadaEm = '2026-03-01T10:00:00.000Z'
    const d = new Disciplina('Compiladores', 60, ['Algoritmos'], 'Cicrano Blau', 'doc-1', criadaEm)

    expect(d.toJSON()).toEqual({
      nome: 'Compiladores',
      creditos: 60,
      concluida: false,
      prerequisitos: ['Algoritmos'],
      professor: 'Cicrano Blau',
      dataCriacao: criadaEm,
    })
  })

  it('NÃO inclui o id (o id é o nome do documento, não um campo)', () => {
    const d = new Disciplina('Redes', 40, [], '', 'doc-1')
    expect(d.toJSON()).not.toHaveProperty('id')
  })

  it('reflete a conclusão depois de marcar', () => {
    const d = new Disciplina('Redes', 40)
    d.marcarConcluida()

    expect(d.toJSON().concluida).toBe(true)
  })
})

describe('Disciplina — fromJSON', () => {
  it('reconstrói a partir do documento do Firestore, incluindo o id', () => {
    const d = Disciplina.fromJSON(
      {
        nome: 'Compiladores',
        creditos: 60,
        concluida: true,
        prerequisitos: ['Algoritmos'],
        professor: 'Cicrano Blau',
        dataCriacao: '2026-03-01T10:00:00.000Z',
      },
      'doc-1'
    )

    expect(d.getId()).toBe('doc-1')
    expect(d.getNome()).toBe('Compiladores')
    expect(d.getCreditos()).toBe(60)
    expect(d.isConcluida()).toBe(true)
    expect(d.getPrerequisitos()).toEqual(['Algoritmos'])
    expect(d.getProfessor()).toBe('Cicrano Blau')
  })

  it('tolera documentos antigos sem prerequisitos/professor/concluida', () => {
    const d = Disciplina.fromJSON({ nome: 'Legada', creditos: 30 }, 'doc-9')

    expect(d.getPrerequisitos()).toEqual([])
    expect(d.getProfessor()).toBe('')
    expect(d.isConcluida()).toBe(false)
    expect(d.getId()).toBe('doc-9')
  })

  it('concluida falsy não marca como concluída', () => {
    expect(Disciplina.fromJSON({ nome: 'X', creditos: 1, concluida: false }).isConcluida()).toBe(false)
    expect(Disciplina.fromJSON({ nome: 'X', creditos: 1, concluida: 0 }).isConcluida()).toBe(false)
  })

  it('faz round-trip: toJSON -> fromJSON preserva os dados', () => {
    const original = new Disciplina('Redes', 40, ['Cálculo'], 'Cicrano', 'doc-1', '2026-03-01T10:00:00.000Z')
    original.marcarConcluida()

    const reidrata = Disciplina.fromJSON(original.toJSON(), original.getId())

    expect(reidrata.toJSON()).toEqual(original.toJSON())
    expect(reidrata.isConcluida()).toBe(true)
  })

  it('permite sobrescrever o id via setId', () => {
    const d = Disciplina.fromJSON({ nome: 'X', creditos: 1 })
    d.setId('novo-id')
    expect(d.getId()).toBe('novo-id')
  })
})

describe('Disciplina — getDataCriacaoFormatada', () => {
  // Constrói a data por componentes LOCAIS pra o teste não depender do timezone da máquina.
  it('formata em DD/MM/AAAA (pt-BR)', () => {
    const local = new Date(2026, 8, 16, 12, 0, 0) // 16/09/2026 12:00 local
    const d = new Disciplina('Redes', 40, [], '', null, local.toISOString())

    expect(d.getDataCriacaoFormatada()).toBe('16/09/2026')
  })

  it('preenche dia e mês com zero à esquerda', () => {
    const local = new Date(2026, 0, 5, 12, 0, 0) // 05/01/2026
    const d = new Disciplina('Redes', 40, [], '', null, local.toISOString())

    expect(d.getDataCriacaoFormatada()).toBe('05/01/2026')
  })
})
