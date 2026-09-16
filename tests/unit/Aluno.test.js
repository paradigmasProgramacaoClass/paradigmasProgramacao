import { describe, it, expect } from 'vitest'
import Aluno from '@/models/Aluno'

const perfilValido = {
  nome: 'Marcelo Carvalho',
  email: 'marcelo@exemplo.com',
  curso: 'Ciência da Computação',
  periodo: 5,
  creditosNecessarios: 1000,
}

describe('Aluno — getters', () => {
  it('expõe os campos informados no construtor', () => {
    const a = new Aluno(perfilValido)

    expect(a.getNome()).toBe('Marcelo Carvalho')
    expect(a.getEmail()).toBe('marcelo@exemplo.com')
    expect(a.getCurso()).toBe('Ciência da Computação')
    expect(a.getPeriodo()).toBe(5)
    expect(a.getCreditosNecessarios()).toBe(1000)
  })

  it('aceita os valores padrão do registro (curso vazio, periodo 1)', () => {
    // É o que Login/Registro gravam no primeiro acesso
    const a = new Aluno({
      nome: 'Usuário Google',
      email: 'user@gmail.com',
      curso: '',
      periodo: 1,
      creditosNecessarios: 1000,
    })

    expect(a.getCurso()).toBe('')
    expect(a.getPeriodo()).toBe(1)
  })
})

describe('Aluno — encapsulamento', () => {
  it('não expõe os campos privados como propriedades públicas', () => {
    const a = new Aluno(perfilValido)

    expect(Object.keys(a)).toEqual([])
    expect(a.nome).toBeUndefined()
    expect(a.creditosNecessarios).toBeUndefined()
  })
})

describe('Aluno — setters', () => {
  it('setCurso e setPeriodo atualizam os campos', () => {
    const a = new Aluno(perfilValido)

    a.setCurso('Engenharia de Software')
    a.setPeriodo(7)

    expect(a.getCurso()).toBe('Engenharia de Software')
    expect(a.getPeriodo()).toBe(7)
  })

  it('setCurso não altera os outros campos', () => {
    const a = new Aluno(perfilValido)
    a.setCurso('Outro curso')

    expect(a.getNome()).toBe('Marcelo Carvalho')
    expect(a.getCreditosNecessarios()).toBe(1000)
  })
})

describe('Aluno — toJSON', () => {
  it('serializa exatamente as chaves do documento users/{uid}', () => {
    const a = new Aluno(perfilValido)

    expect(a.toJSON()).toEqual(perfilValido)
    expect(Object.keys(a.toJSON()).sort()).toEqual([
      'creditosNecessarios',
      'curso',
      'email',
      'nome',
      'periodo',
    ])
  })

  it('reflete alterações feitas pelos setters', () => {
    const a = new Aluno(perfilValido)
    a.setCurso('Engenharia')
    a.setPeriodo(2)

    expect(a.toJSON().curso).toBe('Engenharia')
    expect(a.toJSON().periodo).toBe(2)
  })
})

describe('Aluno — fromJSON', () => {
  it('reconstrói o perfil a partir do Firestore', () => {
    const a = Aluno.fromJSON(perfilValido)

    expect(a.getNome()).toBe('Marcelo Carvalho')
    expect(a.getCurso()).toBe('Ciência da Computação')
    expect(a.getPeriodo()).toBe(5)
    expect(a.getCreditosNecessarios()).toBe(1000)
  })

  it('faz round-trip: toJSON -> fromJSON preserva os dados', () => {
    const original = new Aluno(perfilValido)
    const reidrata = Aluno.fromJSON(original.toJSON())

    expect(reidrata.toJSON()).toEqual(original.toJSON())
  })

  it('cria uma instância nova, não reaproveita a referência', () => {
    const a = Aluno.fromJSON(perfilValido)
    a.setCurso('Modificado')

    // O objeto de origem não deve ser mutado por tabela
    expect(perfilValido.curso).toBe('Ciência da Computação')
    expect(a.getCurso()).toBe('Modificado')
  })
})
