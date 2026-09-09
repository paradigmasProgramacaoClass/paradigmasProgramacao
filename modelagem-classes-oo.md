# Modelagem de Classes OO — Trilha Acadêmica

Projeto: Trilha Acadêmica (React + Firebase/Firestore)
projectId: `paradigmas-8f1cb`

---

## Estrutura no Firestore

```
users/{uid}                          ← perfil do aluno
  ├── nome: string
  ├── email: string
  ├── curso: string
  ├── periodo: number
  └── creditosNecessarios: number     ← total exigido pra formar

users/{uid}/disciplinas/{id}         ← subcollection, uma por disciplina
  ├── nome: string
  ├── creditos: number
  ├── concluida: boolean
  └── prerequisitos: string[]        ← array de nomes
```

---

## Diagrama de Classes

```
┌─────────────────────────────────────────┐
│           class Disciplina              │
├─────────────────────────────────────────┤
│  # nome: string                         │
│  # creditos: number                     │
│  # concluida: boolean                   │
│  # prerequisitos: string[]              │
├─────────────────────────────────────────┤
│  + constructor(nome, creditos,          │
│       prerequisitos=[])                 │
│  + getNome(): string                    │
│  + getCreditos(): number                │
│  + isConcluida(): boolean               │
│  + marcarConcluida(): void              │
│  + getPrerequisitos(): string[]         │
│  + toJSON(): object                     │
│  + static fromJSON(data): Disciplina    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│           class Aluno                   │
├─────────────────────────────────────────┤
│  # nome: string                         │
│  # email: string                        │
│  # curso: string                        │
│  # periodo: number                      │
│  # creditosNecessarios: number           │
├─────────────────────────────────────────┤
│  + constructor(dados)                   │
│  + getNome(): string                    │
│  + getCurso(): string                   │
│  + getPeriodo(): number                 │
│  + getCreditosNecessarios(): number     │
│  + setCurso(curso): void                │
│  + setPeriodo(periodo): void            │
│  + toJSON(): object                     │
│  + static fromJSON(data): Aluno         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│       class DisciplinaService           │
│  (encapsula acesso ao Firestore)        │
├─────────────────────────────────────────┤
│  - db: Firestore                        │
│  - uid: string                           │
├─────────────────────────────────────────┤
│  + constructor(uid)                     │
│  + async adicionar(disciplina): Promise │
│  + async listar(): Promise<Disciplina[]>│
│  + async atualizar(id, disciplina): ... │
│  + async remover(id): Promise           │
│  + async marcarConcluida(id): Promise   │
│  + async listarDisponiveis():           │
│       Promise<Disciplina[]>             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│          class AlunoService             │
│  (encapsula perfil no Firestore)        │
├─────────────────────────────────────────┤
│  - db: Firestore                        │
│  - uid: string                          │
├─────────────────────────────────────────┤
│  + constructor(uid)                     │
│  + async salvar(aluno): Promise         │
│  + async buscar(): Promise<Aluno>       │
│  + async creditosConcluidos(): number   │
│  + async creditosRestantes(): number    │
└─────────────────────────────────────────┘
```

---

## Conceitos OO Aplicados

- **Encapsulamento**: atributos com `#` (privados), acesso só por getters/setters
- **Abstração**: `DisciplinaService` e `AlunoService` escondem a complexidade do Firestore — o resto do app não sabe como os dados são gravados
- **Factory Method**: `Disciplina.fromJSON()` e `Aluno.fromJSON()` convertem dados crus do Firestore em objetos
- **Coesão**: cada classe tem uma responsabilidade única
