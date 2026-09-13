# Relatório de Desenvolvimento — Trilha Acadêmica

**Projeto:** Trilha Acadêmica (sistema de planejamento acadêmico)
**Disciplina:** Paradigmas de Programação (POO)
**Firebase projectId:** `paradigmas-8f1cb`
**Data:** 13 de setembro de 2026
**Repo:** `git@github.com:paradigmasProgramacaoClass/paradigmasProgramacao.git`

---

## 1. Visão Geral

O Trilha Acadêmica é um protótipo de sistema de planejamento acadêmico. O aluno
cadastra suas disciplinas, marca as concluídas, e o sistema calcula quais estão
disponíveis para cursar (pré-requisitos cumpridos) e quantos créditos faltam para
a formatura.

O projeto foi desenvolvido como trabalho da disciplina de Paradigmas de
Programação, demonstrando conceitos de orientação a objetos (encapsulamento,
classes, separação de responsabilidades) em JavaScript, integrados com React e
Firebase.

---

## 2. Stack

| Tecnologia | Versão | Função |
|---|---|---|
| React | 19 | Framework UI |
| Vite | 8 | Build tool e dev server |
| Firebase | 12 (Web SDK) | Auth + Firestore (banco NoSQL) |
| React Router DOM | 7 | Roteamento (`createBrowserRouter`) |
| Tailwind CSS | 4 | Estilização |
| shadcn/ui | — | Componentes de UI (Button, Input, Label, Card) |
| oxlint | 1.79 | Linter |

---

## 3. Arquitetura

O projeto segue uma arquitetura em camadas com separação de responsabilidades:

```
┌─────────────────────────────────────────────────┐
│  UI (Pages + Components)                         │
│  Login, Home, Disciplinas, etc.                  │
│  Não acessa o Firebase diretamente               │
├─────────────────────────────────────────────────┤
│  Hooks (useDisciplinas, useAluno)                │
│  Ponte entre UI e services                       │
│  Gerenciam loading/error/data                    │
├─────────────────────────────────────────────────┤
│  Context (AuthContext)                           │
│  Estado global de autenticação (user, uid)       │
├─────────────────────────────────────────────────┤
│  Services (DisciplinaService, AlunoService)      │
│  CRUD no Firestore                               │
│  Cada service encapsula as operações de banco    │
├─────────────────────────────────────────────────┤
│  Models (Disciplina, Aluno)                      │
│  Classes de domínio puras (encapsulamento)       │
│  Não sabem que o Firebase existe                 │
├─────────────────────────────────────────────────┤
│  Config (firebase.js)                            │
│  Inicializa Firebase App, Firestore e Auth       │
│  Chaves reais — gitignored                       │
└─────────────────────────────────────────────────┘
```

### Princípios de OO aplicados

- **Encapsulamento**: classes `Disciplina` e `Aluno` usam campos privados (`#`)
  com getters/setters controlados
- **Separação de responsabilidades**: models não conhecem o Firebase, services
  não conhecem a UI, UI não acessa o Firestore diretamente
- **Reusabilidade**: models são classes puras, fáceis de testar e reusar
- **Abstração**: hooks escondem a complexidade do data fetching da UI

---

## 4. Estrutura de Arquivos

```
src/
├── config/
│   ├── firebase.js          ← chaves reais (gitignored)
│   └── firebase.example.js  ← template sem chaves
│
├── context/
│   └── AuthContext.jsx      ← AuthProvider + useAuth() (user, uid, logout)
│
├── hooks/
│   ├── useDisciplinas.js    ← fetch + CRUD de disciplinas + filtros (emCurso, concluidas)
│   └── useAluno.js          ← fetch perfil + creditosConcluidos + creditosRestantes
│
├── lib/
│   ├── auth-errors.js       ← traduzirErroAuth(code) — tradução de erros do Firebase
│   └── utils.js             ← cn() helper do Tailwind/shadcn
│
├── models/
│   ├── Disciplina.js        ← classe Disciplina (nome, creditos, concluida, prerequisitos, professor, dataCriacao)
│   └── Aluno.js             ← classe Aluno (nome, email, curso, periodo, creditosNecessarios)
│
├── services/
│   ├── DisciplinaService.js ← CRUD + listarDisponiveis() + toggleConcluida()
│   └── AlunoService.js      ← salvar, buscar, creditosConcluidos, creditosRestantes
│
├── components/
│   ├── ui/                  ← shadcn/ui (button, input, label, card)
│   ├── Navbar.jsx           ← barra superior com nome do usuário + logout
│   ├── Modal.jsx            ← modal reutilizável (fecha no backdrop)
│   └── RotaProtegida.jsx    ← protege rotas (redirect pra /login se deslogado)
│
├── pages/
│   ├── Login.jsx            ← signInWithEmailAndPassword
│   ├── Registro.jsx         ← createUserWithEmailAndPassword + AlunoService.salvar
│   ├── RecuperarSenha.jsx   ← sendPasswordResetEmail
│   ├── Home.jsx             ← dashboard: disciplinas em curso + créditos
│   ├── Disciplinas.jsx      ← CRUD de disciplinas com modais
│   ├── DisciplinasConcluidas.jsx ← lista de disciplinas concluídas
│   └── MeusCreditos.jsx     ← total de créditos + histórico
│
├── routes.jsx               ← createBrowserRouter + RotaProtegida
├── App.jsx                  ← RouterProvider
└── main.jsx                 ← entrypoint (AuthProvider envolve App)

.agents/spec.md               ← spec completa do projeto (gitignored)
```

---

## 5. Modelagem de Classes

### Disciplina

```javascript
class Disciplina {
  #id          // string | null
  #nome        // string
  #creditos    // number
  #concluida   // boolean
  #prerequisitos  // string[]
  #professor      // string
  #dataCriacao    // string (ISO)

  constructor(nome, creditos, prerequisitos=[], professor="", id=null, dataCriacao=null)
  getId() / setId(id)
  getNome() / getCreditos() / isConcluida() / getPrerequisitos()
  getProfessor() / getDataCriacao() / getDataCriacaoFormatada()  // DD/MM/AAAA
  marcarConcluida() / desmarcarConcluida()
  toJSON() / static fromJSON(data, id=null)
}
```

### Aluno

```javascript
class Aluno {
  #nome / #email / #curso / #periodo / #creditosNecessarios

  constructor({ nome, email, curso, periodo, creditosNecessarios })
  getNome() / getEmail() / getCurso() / getPeriodo() / getCreditosNecessarios()
  setCurso(curso) / setPeriodo(periodo)
  toJSON() / static fromJSON(data)
}
```

### DisciplinaService

```javascript
class DisciplinaService {
  #uid  // string

  constructor(uid)
  adicionar(disciplina)     // addDoc → retorna id
  listar()                  // getDocs → Disciplina[]
  atualizar(id, disciplina) // updateDoc
  remover(id)               // deleteDoc
  toggleConcluida(disciplina) // inverte + updateDoc
  listarDisponiveis()       // não concluídas com pré-reqs cumpridos
}
```

### AlunoService

```javascript
class AlunoService {
  #uid / #disciplinaService

  constructor(uid, disciplinaService)
  salvar(aluno)             // setDoc
  buscar()                  // getDoc → Aluno | null
  creditosConcluidos()      // soma créditos das concluídas
  creditosRestantes()       // creditosNecessarios - concluidos
}
```

---

## 6. Banco de Dados (Firestore)

### Estrutura

```
users/{uid}                          ← perfil do aluno
  ├── nome: string
  ├── email: string
  ├── curso: string
  ├── periodo: number
  └── creditosNecessarios: number

users/{uid}/disciplinas/{id}         ← subcollection de disciplinas
  ├── nome: string
  ├── creditos: number
  ├── concluida: boolean
  ├── prerequisitos: string[]
  ├── professor: string
  └── dataCriacao: string (ISO)
```

### Regras de segurança

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /disciplinas/{disciplinaId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

Cada usuário só lê/escreve no próprio documento e na sua subcollection de
disciplinas. Sem acesso a dados de outros usuários.

---

## 7. Autenticação (Firebase Auth)

### Métodos utilizados

| Função do SDK | Onde | O que faz |
|---|---|---|
| `signInWithEmailAndPassword` | Login.jsx | Login do usuário |
| `createUserWithEmailAndPassword` | Registro.jsx | Cria conta no Auth + perfil no Firestore |
| `sendPasswordResetEmail` | RecuperarSenha.jsx | Envia email de recuperação |
| `signOut` | AuthContext.jsx | Logout (via hook `useAuth().logout()`) |
| `onAuthStateChanged` | AuthContext.jsx | Listener global de estado de auth |

### AuthContext

Centraliza o estado de autenticação em um React Context. O `AuthProvider`
envolve o app em `main.jsx` e expõe:

- `user` — Firebase User, `null` (deslogado) ou `undefined` (carregando)
- `uid` — `user?.uid` (atalho)
- `logout()` — chama `signOut(auth)`

### Tratamento de erros

Erros do Firebase Auth são traduzidos para português via `traduzirErroAuth(code)`
em `src/lib/auth-errors.js`. Códigos mapeados:

| Código Firebase | Mensagem exibida |
|---|---|
| `auth/invalid-credential` | E-mail ou senha incorretos |
| `auth/user-not-found` | Usuário não encontrado |
| `auth/wrong-password` | Senha incorreta |
| `auth/invalid-email` | E-mail inválido |
| `auth/too-many-requests` | Muitas tentativas. Tente mais tarde |
| `auth/network-request-failed` | Erro de conexão. Verifique sua internet |
| `auth/email-already-in-use` | Este e-mail já está cadastrado |
| `auth/weak-password` | A senha deve ter pelo menos 6 caracteres |

### Fluxo de auth

```
[Visitante]
    │
    ├── /login → signInWithEmailAndPassword → sucesso → / (Home)
    ├── /registro → createUserWithEmailAndPassword + AlunoService.salvar → /login
    ├── /recuperar-senha → sendPasswordResetEmail → mensagem de sucesso
    │
    └── rotas protegidas → RotaProtegida verifica useAuth()
                         ├── undefined → "Carregando..."
                         ├── null → redirect /login
                         └── user → renderiza a página

[Logado]
    └── Navbar → botão "Sair" → logout() → /login
```

---

## 8. Data Flow (Backend → UI)

### Padrão

As páginas (UI) **nunca** acessam o Firestore diretamente. O fluxo é:

```
AuthContext (uid) → Custom Hook → Service → Firestore
                                                   ↓
UI (useState) ←── Hook (loading/error/data) ←── Service ←── Firestore
```

### Custom Hooks

**`useDisciplinas()`** — gerencia disciplinas:
- Instancia `DisciplinaService(uid)` automaticamente
- Faz `listar()` no `useEffect` ao montar
- Expõe `adicionar`, `atualizar`, `remover`, `toggleConcluida` (chamam o service
  e recarregam a lista sozinhos)
- Filtros derivados: `emCurso` (não concluídas) e `concluidas` (concluídas)
- Estados: `loading`, `error`, `disciplinas`

**`useAluno()`** — gerencia perfil do aluno:
- Instancia `AlunoService(uid, new DisciplinaService(uid))`
- Faz `buscar()` no `useEffect`
- Expõe `aluno`, `creditosConcluidos`, `creditosRestantes`
- Estados: `loading`, `error`

### Ciclo de uma página

1. Página monta → `useAuth()` pega `uid` do AuthContext
2. Hook instancia o service com `uid` → `useEffect` chama `service.listar()`
3. Service faz `getDocs` no Firestore → retorna dados
4. Hook faz `setState` (data + loading=false) → página re-renderiza
5. Usuário clica "Adicionar" → modal abre com inputs controlados
6. Usuário preenche form → clica "Salvar" → hook chama `service.adicionar()`
7. Service faz `addDoc` no Firestore → hook chama `carregar()` → recarrega lista
8. Página re-renderiza com a nova disciplina

---

## 9. Rotas

Configuradas em `src/routes.jsx` com `createBrowserRouter` (React Router DOM v7).

| Rota | Página | Protegida? | Observação |
|---|---|---|---|
| `/` | Home | Sim | Dashboard com disciplinas em curso e créditos |
| `/login` | Login | Não | Redirect pra `/` se já logado (LoginRedirect) |
| `/registro` | Registro | Não | Cria conta + perfil no Firestore |
| `/recuperar-senha` | RecuperarSenha | Não | Envia email de recuperação |
| `/disciplinas` | Disciplinas | Sim | CRUD de disciplinas com modais |
| `/disciplinas-concluidas` | DisciplinasConcluidas | Sim | Lista de concluídas |
| `/meus-creditos` | MeusCreditos | Sim | Total de créditos + histórico |
| `*` | — | — | Redirect pra `/` |

### RotaProtegida

Componente que envolve rotas protegidas. Usa `useAuth()` do AuthContext:
- `user === undefined` → mostra "Carregando..." (ainda verificando auth)
- `user === null` → `<Navigate to="/login" />` (não logado)
- `user` existe → renderiza a página

### LoginRedirect

Componente wrapper para a rota `/login` — se o usuário já estiver logado,
redireciona pra `/`. Necessário porque `createBrowserRouter` não permite hooks
diretamente no array de rotas.

---

## 10. Páginas — O que cada uma faz

### Login.jsx
- Inputs controlados (email, senha) com `useState`
- Botão de mostrar/esconder senha (Eye/EyeOff do lucide-react)
- `signInWithEmailAndPassword` no submit
- Loading state no botão ("Entrando...")
- Mensagem de erro traduzida abaixo dos inputs
- Redirect pra `/` se já logado
- Link pra `/recuperar-senha` e `/registro`

### Registro.jsx
- Inputs controlados (nome, email, senha, confirmarSenha)
- Validações locais: senha ≥ 6 chars, senha === confirmarSenha
- `createUserWithEmailAndPassword` → depois `AlunoService.salvar()` (cria perfil)
- Valores padrão: `curso: ""`, `periodo: 1`, `creditosNecessarios: 1000`
- Redirect pra `/login` após registro
- Dois botões de mostrar/esconder senha (senha e confirmar)

### RecuperarSenha.jsx
- Input controlado (email)
- `sendPasswordResetEmail` no submit
- Alerta visual verde mostra "Enviamos um link de recuperação para seu e-mail"
- Mensagem de erro traduzida

### Home.jsx
- `useAluno()` → nome, curso, período, créditos necessários
- `useDisciplinas()` → `emCurso` (disciplinas não concluídas)
- Mostra créditos: concluídos / necessários
- Lista de disciplinas em curso com barra de progresso
- Loading state e empty state ("Nenhuma disciplina em curso.")
- Links pra `/disciplinas` e `/meus-creditos`

### Disciplinas.jsx
- `useDisciplinas()` → lista completa + ações de CRUD
- Tabela com checkbox (toggle concluída), nome, professor, créditos, data
- 3 modais funcionais:
  - **Adicionar**: form com nome, professor, créditos → `adicionar()`
  - **Editar**: form pré-preenchido → `atualizar()`
  - **Excluir**: confirmação → `remover()`
- Loading state e empty state ("Nenhuma disciplina adicionada ainda.")
- Toggle de individual por linha: clica no checkbox → `toggleConcluida(d)`

### DisciplinasConcluidas.jsx
- `useDisciplinas()` → `concluidas` (filtro derivado)
- Tabela com nome, professor, créditos, data formatada
- Loading state e empty state ("Nenhuma disciplina concluída ainda.")
- Toggle entre "Em curso" (link pra `/disciplinas`) e "Concluídas" (atual)

### MeusCreditos.jsx
- `useAluno()` → `creditosConcluidos`, `aluno.getCreditosNecessarios()`
- `useDisciplinas()` → `concluidas` (histórico)
- Total grande: concluídos / necessários
- Tabela de histórico: disciplina, atividade, créditos, data
- Loading state e empty state

---

## 11. Componentes

### Navbar.jsx
- Barra superior com menu hambúrguer e área do usuário
- Usa `useAuth()` para pegar o nome do usuário
- Botão de logout (ícone LogOut) → `signOut` → redirect `/login`

### Modal.jsx
- Modal reutilizável — recebe `isOpen`, `onClose`, `children`
- Fecha ao clicar no backdrop (overlay)
- Click dentro do conteúdo não propaga (não fecha)

### RotaProtegida.jsx
- Envolve rotas que exigem login
- Usa `useAuth()` do AuthContext
- Redirect pra `/login` se deslogado, "Carregando..." se verificando

### shadcn/ui (src/components/ui/)
- `button.jsx` + `button-variants.js` — Button com variantes
- `input.jsx` — Input estilizado
- `label.jsx` — Label estilizado
- `card.jsx` — Card container

---

## 12. Configuração do Firebase

### firebase.js (gitignored)

Arquivo com as chaves reais do projeto. Não está no repositório. Exporta:
- `db` — instância do Firestore (`getFirestore(app)`)
- `auth` — instância do Auth (`getAuth(app)`)

### firebase.example.js (no repo)

Template sem chaves para novos desenvolvedores. Copiar para `firebase.js` e
preencher com os valores reais.

### Credenciais

Dois arquivos foram fornecidos:
- **CHAVE WEB.txt** — configuração do Web SDK (apiKey, authDomain, etc.) → usada
  em `firebase.js`
- **paradigmas-8f1cb-firebase-adminsdk-*.json** — service account do Admin SDK
  (servidor/Node, não usado no app web)

### Console do Firebase

- **Firestore**: https://console.firebase.google.com/project/paradigmas-8f1cb/firestore
- **Authentication**: https://console.firebase.google.com/project/paradigmas-8f1cb/authentication/users

---

## 13. Cronologia de Desenvolvimento

### Commits (do mais antigo ao mais recente)

| Commit | Descrição | Arquivos |
|---|---|---|
| `81f2f22` | Initial commit | README.md |
| `e2b2703` | Inicializando projeto React | 21 arquivos (models, services, config, pages) |
| `c07d832` | Tema visual, shadcn/ui, react-router-dom | 13 arquivos (UI components, tema, rotas) |
| `025ec48` | Rotas extraídas para routes.jsx + RotaProtegida | 4 arquivos |
| `d069c5b` | UI: páginas e rotas (branch ui) | 14 arquivos (Login, Home, Disciplinas, etc.) |
| `ef244e1` | Fix: rota /disciplinas-concluidas → /home (branch ui) | 4 arquivos |
| `e444a62` | .gitignore: arquivos do macOS | 1 arquivo |
| `14db7a4` | Merge da branch ui na main | merge commit |
| `6baa921` | **Fase 1**: fundação (model, AuthContext, hooks, componentes) | 12 arquivos |
| `85cc768` | **Fase 2**: auth nas páginas (Login, Registro, RecuperarSenha) | 3 arquivos |
| `4066b1d` | **Fase 3**: rotas protegidas + /recuperar-senha | 1 arquivo |
| `96774c2` | **Fase 4.1**: Home e DisciplinasConcluidas com dados reais | 2 arquivos |
| `c08f4c3` | **Fase 4.2**: Disciplinas (CRUD) e MeusCreditos com dados reais | 2 arquivos |

### Linha do tempo

1. **Inicialização** — projeto React criado com Vite, models e services
   implementados, Firebase configurado
2. **UI visual** — branch `ui` com 7 páginas de mockup visual (sem dados reais),
   tema Tailwind, shadcn/ui, rotas
3. **Merge** — branch `ui` mergeada na main
4. **Fase 1** — fundação: model expandido (professor, dataCriacao), AuthContext,
   custom hooks (useDisciplinas, useAluno), componentes base atualizados
5. **Fase 2** — auth funcional: Login, Registro e RecuperarSenha plugados no
   Firebase Auth
6. **Fase 3** — rotas: RotaProtegida aplicada, /recuperar-senha registrada
7. **Fase 4** — dados reais: todas as páginas substituem dados hardcoded por
   hooks que buscam no Firestore
8. **Verificação** — build e lint limpos, testado no browser

---

## 14. Problemas Encontrados e Resolvidos

### 1. npm config `omit=dev` global
**Problema:** `npm install` / `npm ci` não instalavam as devDependencies
(`@vitejs/plugin-react`, `vite`), quebrando o build.
**Causa:** `npm config get omit` retornava `dev` (configuração global da
máquina).
**Solução:** usar `npm ci --include=dev` para forçar a instalação completa.

### 2. Rota /recuperar-senha não registrada
**Problema:** o link "Esqueci minha senha" do Login apontava pra
`/recuperar-senha`, mas a rota não existia em `routes.jsx` → caía no wildcard
`*` → redirecionava pra `/`.
**Solução:** registrar a rota na Fase 3.

### 3. RotaProtegida não aplicada
**Problema:** o componente `RotaProtegida` existia mas não envolvia nenhuma rota.
Qualquer um acessava as telas internas sem login.
**Solução:** aplicar `RotaProtegida` nas rotas `/`, `/disciplinas`,
`/disciplinas-concluidas`, `/meus-creditos` na Fase 3.

### 4. Regras do Firestore bloqueando tudo
**Problema:** registro criava usuário no Firebase Auth mas não salvava o perfil
no Firestore (erro 400). Tela mostrava "Perfil não encontrado".
**Causa:** regras do Firestore estavam `allow read, write: if false;` (modo
bloqueado).
**Solução:** atualizar regras para permitir escrita no próprio documento:
`allow read, write: if request.auth != null && request.auth.uid == userId;`

### 5. Ad blocker bloqueando Firestore
**Problema:** conexão com `firestore.googleapis.com` bloqueada
(`ERR_BLOCKED_BY_CLIENT`).
**Causa:** ad blocker (uBlock Origin etc.) confundindo o domínio do Firestore
com tracker.
**Solução:** desativar ad blocker para `localhost:5173`.

### 6. Warnings de lint pré-existentes
**Problema:** `Modal.jsx` tinha `onClose` não usado e `Navbar.jsx` tinha import
de `Link` não usado.
**Solução:** Fase 1 — `onClose` passou a ser usado no click do backdrop; import
de `Link` removido do Navbar.

---

## 15. Como Rodar

### Pré-requisitos
- Node.js 22+
- npm 10+

### Instalação

```bash
# Instalar dependências (FORÇAR dev deps se npm config omit=dev estiver ativo)
npm ci --include=dev

# Copiar config do Firebase
cp src/config/firebase.example.js src/config/firebase.js
# Editar firebase.js com as chaves reais do projeto Firebase
```

### Desenvolvimento

```bash
npm run dev
# Servidor em http://localhost:5173
```

### Build e Lint

```bash
npm run build   # build de produção → dist/
npm run lint    # oxlint
```

### Configuração do Firebase Console

1. **Authentication** → ativar Email/senha
2. **Firestore** → criar database (modo produção)
3. **Firestore → Regras** → colar as regras de segurança (seção 6 deste relatório)
4. **Firestore → Índices** → não precisa (queries simples)

---

## 16. Estado Final

| Item | Status |
|---|---|
| Build (`npm run build`) | ✅ Limpo |
| Lint (`npm run lint`) | ✅ Zero erros/warnings |
| Auth (login, registro, recuperar senha) | ✅ Funcional |
| Rotas protegidas | ✅ Funcional |
| CRUD de disciplinas | ✅ Funcional |
| Dados reais do Firestore | ✅ Todas as páginas |
| Loading states | ✅ Todas as páginas |
| Empty states | ✅ Todas as páginas |
| Logout | ✅ Funcional (Navbar) |
| Firestore regras de segurança | ✅ Configuradas |
| Push para GitHub | ⏳ Pendente (chave SSH com passphrase) |

### Pendências conhecidas

1. **Push para GitHub** — rodar `ssh-add ~/.ssh/id_ed25519` (passphrase) +
   `git push origin main`
2. **Tela de perfil** — não existe; o aluno não pode editar curso, período e
   creditosNecessarios após o registro (valores padrão: curso="", periodo=1,
   creditosNecessarios=1000)
3. **Paginação** — a paginação em DisciplinasConcluidas é visual (não funcional)
4. **Barra de progresso** — em Home, o progresso das disciplinas é sempre 0%
   (não há campo de "créditos atribuídos por disciplina" no model, só o total)
5. **DisciplinaCard e PageHeader** — componentes existentes em `src/components/`
   mas não utilizados pelas páginas atuais

---

## 17. Decisões de Design

1. **Models com campos privados (#)** — demonstra encapsulamento de POO em JS,
   requisito da disciplina
2. **Services como classes** — encapsulam as operações do Firestore, recebem
   `uid` no construtor
3. **Custom hooks como ponte** — padrão React moderno; a UI não sabe como os
   dados chegam, só consome `{ data, loading, error }`
4. **AuthContext centralizado** — evita repetir `onAuthStateChanged` em cada
   página
5. **traduzirErroAuth compartilhado** — um arquivo, importado por 3 páginas
6. **firebase.js gitignored** — chaves não vão pro repo; só `firebase.example.js`
7. **.agents/ gitignored** — specs e notas de desenvolvimento não vão pro repo
8. **Model Disciplina com professor e dataCriacao** — UI mostra esses campos no
   mockup, então o model acompanha (decisão tomada no início do projeto)
9. **shadcn/ui preservado** — o agente codificador não inventou novos
   componentes; usou os existentes (Button, Input, Label) e manteve as classes
   Tailwind originais

---

## 18. Ferramentas e Processo

### Como o projeto foi desenvolvido

O projeto foi desenvolvido em modo **co-pilot**: o Hermes Agent (orquestrador)
guiou o processo, e um agente codificador externo (Kimi K2.7 via Ollama)
implementou o código seguindo prompts detalhados.

### Workflow

1. **Diagnóstico** — Hermes analisou o estado do repo (merge, branches, UI,
   services, models) e identificou o gap: UI era mockup puro, sem Firebase
2. **Spec** — Hermes escreveu `.agents/spec.md` com a spec completa (modelagem,
   auth, data flow, hooks, páginas, rotas, regras do Firestore)
3. **Prompts em fases** — Hermes dividiu o trabalho em 5 fases e deu um prompt
   por fase pro agente codificador
4. **Verificação por fase** — após cada fase, Hermes rodou `npm run build` +
   `npm run lint`, leu os arquivos gerados, e commitou
5. **Teste no browser** — Hermes testou rotas, auth, redirecionamentos e
   fluxo de registro no browser via CDP

### Arquivos de referência

- `.agents/spec.md` — spec completa do projeto (gitignored)
- `README.md` — documentação de instalação e estrutura
- `modelagem-classes-oo.md` — diagrama de classes OO

---

# Fluxo Completo — Trilha Acadêmica

## Mapa das camadas

```
main.jsx
  └── AuthProvider (contexto global de auth)
        └── App.jsx
              └── RouterProvider (routes.jsx)
                    ├── /login → Login.jsx
                    ├── /registro → Registro.jsx
                    ├── /recuperar-senha → RecuperarSenha.jsx
                    └── RotaProtegida
                          ├── / → Home.jsx
                          ├── /disciplinas → Disciplinas.jsx
                          ├── /disciplinas-concluidas → DisciplinasConcluidas.jsx
                          └── /meus-creditos → MeusCreditos.jsx
```

Cada página usa hooks que usam services que usam models. Ninguém pula camada.

---

## 1. Boot do app — `main.jsx`

```jsx
<AuthProvider>        ← envolve tudo
  <App />             ← RouterProvider com as rotas
</AuthProvider>
```

O `AuthProvider` monta e registra um listener do Firebase:

```jsx
// AuthContext.jsx
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);  // Firebase User | null
  });
  return () => unsubscribe();
}, []);
```

**O que acontece:** assim que o app carrega, o Firebase verifica se tem sessão ativa (token no localStorage). Se tem, `user` recebe o objeto do usuário. Se não, `user` fica `null`. Enquanto verifica, `user` é `undefined`.

Esse `user` fica disponível pra qualquer componente via `useAuth()`:

```jsx
const { user, uid, logout } = useAuth();
// user: Firebase User | null | undefined
// uid: user?.uid (string ou undefined)
// logout: () => signOut(auth)
```

---

## 2. Visitante tenta acessar `/` (rota protegida)

```
routes.jsx:  path: "/" → element: <RotaProtegida><Home /></RotaProtegida>
```

O `RotaProtegida` é o porteiro:

```jsx
// RotaProtegida.jsx
const { user } = useAuth();

if (user === undefined) return <div>Carregando...</div>;     // ainda verificando
if (user === null) return <Navigate to="/login" />;           // não logado → manda pra login
return children;                                               // logado → renderiza a página
```

**Fluxo:**
1. Usuário digita `localhost:5173/`
2. React Router renderiza `<RotaProtegida>`
3. `useAuth()` pega `user` do contexto
4. `user === null` (não tem sessão) → `<Navigate to="/login" />`
5. Browser redireciona pra `/login`

---

## 3. Registro de novo usuário — `/registro`

```
Registro.jsx
  ├── useState: nome, email, senha, confirmarSenha
  ├── validações locais (senha >= 6, senha === confirmarSenha)
  ├── createUserWithEmailAndPassword(auth, email, senha)     ← cria no Firebase Auth
  ├── new AlunoService(user.uid)                            ← instancia service com o uid
  ├── alunoService.salvar(new Aluno({...}))                 ← salva perfil no Firestore
  └── navigate("/login")                                     ← manda pra login
```

**Passo a passo:**

```jsx
// 1. Cria usuário no Firebase Auth (retorna user com uid)
const { user } = await createUserWithEmailAndPassword(auth, email, senha);

// 2. Instancia o service com o uid do usuário recém-criado
const alunoService = new AlunoService(user.uid);

// 3. Cria um objeto Aluno (model) e salva no Firestore
await alunoService.salvar(
  new Aluno({
    nome,           ← veio do input
    email,          ← veio do input
    curso: "",      ← vazio (aluno preenche depois)
    periodo: 1,
    creditosNecessarios: 1000,
  })
);
```

**O que o service faz por baixo:**

```js
// AlunoService.js
#ref() {
  return doc(db, "users", this.#uid);  // referência: users/{uid}
}

async salvar(aluno) {
  await setDoc(this.#ref(), aluno.toJSON());
  // setDoc = cria se não existir, sobrescreve se existir
}
```

**O que o model faz:**

```js
// Aluno.js
toJSON() {
  return {
    nome: this.#nome,
    email: this.#email,
    curso: this.#curso,
    periodo: this.#periodo,
    creditosNecessarios: this.#creditosNecessarios
  };
}
```

**Resultado no Firestore:**
```
users/{uid}
  ├── nome: "Marcelo"
  ├── email: "marcelo@teste.com"
  ├── curso: ""
  ├── periodo: 1
  └── creditosNecessarios: 1000
```

---

## 4. Login — `/login`

```
Login.jsx
  ├── useState: email, senha, erro, loading, mostrarSenha
  ├── signInWithEmailAndPassword(auth, email, senha)   ← autentica no Firebase
  └── navigate("/")                                     ← vai pra Home
```

```jsx
async function handleLogin(e) {
  e.preventDefault();
  setLoading(true);
  try {
    await signInWithEmailAndPassword(auth, email, senha);
    // onSuccess: onAuthStateChanged dispara → user fica setado no AuthContext
    navigate("/");
  } catch (err) {
    setErro(traduzirErroAuth(err.code));  // traduz código do Firebase pra pt-BR
  } finally {
    setLoading(false);
  }
}
```

**Login com Google (mesma página):**

```jsx
async function handleGoogleLogin() {
  setCriandoPerfil(true);  // segura o redirect automático
  const result = await signInWithPopup(auth, provider);

  // Verifica se já tem perfil no Firestore (primeiro login do Google)
  const alunoService = new AlunoService(result.user.uid);
  const perfilExistente = await alunoService.buscar();
  if (!perfilExistente) {
    // Não tem? Cria com os dados do Google
    await alunoService.salvar(
      new Aluno({
        nome: result.user.displayName || "Usuário Google",
        email: result.user.email || "",
        curso: "", periodo: 1, creditosNecessarios: 1000,
      })
    );
  }
  setCriandoPerfil(false);  // libera o redirect
  navigate("/");
}
```

**Por que `criandoPerfil`?** O `onAuthStateChanged` dispara **imediatamente** quando o popup fecha, setando `user` no contexto. Sem o flag, o `if (user !== null) return <Navigate to="/" />` no topo do Login redirecionaria pra Home antes do `salvar()` terminar → "Perfil não encontrado".

---

## 5. Home carrega — dados reais do Firestore

```
Home.jsx
  ├── useAuth() → pega user (pra passar nome pro Navbar)
  ├── useAluno() → busca perfil + créditos
  ├── useDisciplinas() → busca lista de disciplinas
  ├── loading? → "Carregando..."
  ├── !aluno? → "Perfil não encontrado."
  └── renderiza: nome, curso, créditos, lista de disciplinas em curso
```

**O que `useAluno()` faz por baixo:**

```js
// useAluno.js
const { uid } = useAuth();                    // pega uid do contexto
const service = new AlunoService(uid, new DisciplinaService(uid));

useEffect(() => {
  carregar();  // roda na mount
}, []);

async function carregar() {
  const perfil = await service.buscar();      // getDoc no Firestore → users/{uid}
  setAluno(perfil);                           // Aluno | null

  if (perfil) {
    const concluidos = await service.creditosConcluidos();   // soma créditos das concluídas
    const restantes = await service.creditosRestantes();     // necessários - concluídos
    setCreditosConcluidos(concluidos);
    setCreditosRestantes(restantes);
  }
}
```

**O que `useDisciplinas()` faz por baixo:**

```js
// useDisciplinas.js
const { uid } = useAuth();
const service = new DisciplinaService(uid);

useEffect(() => {
  carregar();  // roda na mount
}, []);

async function carregar() {
  const lista = await service.listar();       // getDocs no Firestore → users/{uid}/disciplinas
  setDisciplinas(lista);                      // Disciplina[]
}

// Filtros derivados (computados, não são estado)
const emCurso = disciplinas.filter((d) => !d.isConcluida());
const concluidas = disciplinas.filter((d) => d.isConcluida());
```

**O que o service faz:**

```js
// DisciplinaService.js
#ref() {
  return collection(db, "users", this.#uid, "disciplinas");  // subcollection
}

async listar() {
  const snapshot = await getDocs(this.#ref());
  return snapshot.docs.map((doc) => {
    return Disciplina.fromJSON(doc.data(), doc.id);  // converte pra objeto
  });
}
```

**O que o model faz no `fromJSON`:**

```js
// Disciplina.js
static fromJSON(data, id = null) {
  const d = new Disciplina(
    data.nome,
    data.creditos,
    data.prerequisitos || [],
    data.professor || "",
    id,              // id do documento no Firestore
    data.dataCriacao
  );
  if (data.concluida) {
    d.marcarConcluida();  // só pode marcar via método (encapsulamento)
  }
  return d;
}
```

**Home renderiza com dados reais:**

```jsx
<Navbar logado nomeUsuario={aluno.getNome()} />       // "Marcelo"

<h1>Disciplinas em curso</h1>
<p>{aluno.getCurso()} - {aluno.getPeriodo()}º período</p>   // "Ciência da Computação - 6º"

<span>{creditosConcluidos}</span>                     // 200
<span>/{aluno.getCreditosNecessarios()}</span>        // /1000

{emCurso.map((d) => (
  <div key={d.getId()}>
    <span>{d.getNome()}</span>                        // "Redes Neurais"
    <span>0 / {d.getCreditos()}</span>                // 0 / 250
  </div>
))}
```

---

## 6. CRUD de disciplinas — `/disciplinas`

```
Disciplinas.jsx
  ├── useDisciplinas() → { disciplinas, adicionar, atualizar, remover, toggleConcluida }
  ├── useState: formAdd, formEdit, idExcluir, modais abertos
  ├── tabela: disciplinas.map((d) => ...)
  ├── Modal Adicionar → formAdd → adicionar(dados)
  ├── Modal Editar → formEdit (pré-preenchido) → atualizar(id, dados)
  ├── Modal Excluir → idExcluir → remover(id)
  └── Checkbox → toggleConcluida(d)
```

### Adicionar disciplina (fluxo completo)

```
1. Usuário clica "Adicionar disciplina" → setIsAdicionarOpen(true) → modal abre

2. Usuário preenche o form:
   formAdd = { nome: "Cálculo II", professor: "Prof. João", creditos: "200" }

3. Usuário clica "Salvar" → handleAdicionar()

4. handleAdicionar chama: adicionar({ nome, professor, creditos: Number(formAdd.creditos), prerequisitos: [] })

5. Hook useDisciplinas.adicionar():
   const d = new Disciplina("Cálculo II", 200, [], "Prof. João")
   await service.adicionar(d)      ← addDoc no Firestore
   await carregar()                ← recarrega a lista do Firestore

6. DisciplinaService.adicionar():
   const docRef = await addDoc(collection(db, "users", uid, "disciplinas"), d.toJSON())
   return docRef.id

7. O que vai pro Firestore:
   users/{uid}/disciplinas/{id_gerado}
     ├── nome: "Cálculo II"
     ├── creditos: 200
     ├── concluida: false
     ├── prerequisitos: []
     ├── professor: "Prof. João"
     └── dataCriacao: "2026-09-13T15:00:00.000Z"  ← gerada no constructor

8. carregar() refaz getDocs → lista atualizada → página re-renderiza
```

### Editar disciplina

```
1. Usuário clica no lápis (Pencil) da linha
   → abrirEditar(d) → setFormEdit com dados da disciplina + setIsEditarOpen(true)

2. Modal abre pré-preenchido:
   formEdit = { id: "abc123", nome: "Cálculo II", professor: "Prof. João", creditos: "200" }

3. Usuário altera o que quiser → clica "Salvar"
   → handleEditar() → atualizar(formEdit.id, { nome, professor, creditos, prerequisitos })

4. Hook: new Disciplina(..., id) → service.atualizar(id, d)
   → updateDoc(doc(db, "users", uid, "disciplinas", id), d.toJSON())

5. carregar() → lista atualizada
```

### Excluir disciplina

```
1. Usuário clica na lixeira (Trash2)
   → abrirExcluir(d.getId()) → setIdExcluir(id) + setIsExcluirOpen(true)

2. Modal de confirmação → clica "Excluir"
   → handleExcluir() → remover(idExcluir)

3. Hook: service.remover(id)
   → deleteDoc(doc(db, "users", uid, "disciplinas", id))

4. carregar() → lista atualizada
```

### Marcar como concluída

```
1. Usuário clica no checkbox da linha
   → toggleConcluida(d)

2. Hook: service.toggleConcluida(disciplina)

3. DisciplinaService.toggleConcluida():
   if (disciplina.isConcluida()) {
     disciplina.desmarcarConcluida();   // model: #concluida = false
   } else {
     disciplina.marcarConcluida();      // model: #concluida = true
   }
   await updateDoc(ref, { concluida: disciplina.isConcluida() })

4. carregar() → lista atualizada → disciplina some de "em curso" e aparece em "concluídas"
```

---

## 7. Disciplinas Concluídas — `/disciplinas-concluidas`

```
DisciplinasConcluidas.jsx
  ├── useDisciplinas() → { concluidas, loading }
  ├── concluidas = disciplinas.filter((d) => d.isConcluida())  ← filtro derivado do hook
  ├── loading? → "Carregando..."
  ├── concluidas.length === 0? → "Nenhuma disciplina concluída ainda."
  └── tabela: concluidas.map((d) => d.getNome(), d.getProfessor(), d.getCreditos(), d.getDataCriacaoFormatada())
```

**Nota:** `concluidas` não é uma busca separada no Firestore. O hook já carregou **todas** as disciplinas uma vez e filtra em memória. Se o usuário marcar uma disciplina como concluída em `/disciplinas`, o `carregar()` recarrega a lista, e quando ele for pra `/disciplinas-concluidas` o hook roda de novo (mount) e a disciplina aparece lá.

---

## 8. Meus Créditos — `/meus-creditos`

```
MeusCreditos.jsx
  ├── useAluno() → { aluno, creditosConcluidos, loading }
  ├── useDisciplinas() → { concluidas, loading }
  ├── loading? → "Carregando..."
  └── renderiza:
       ├── {creditosConcluidos} / {aluno.getCreditosNecessarios()}   ← total
       └── concluidas.map((d) => ...)                                  ← histórico
```

**Como `creditosConcluidos` é calculado (AlunoService):**

```js
async creditosConcluidos() {
  const disciplinas = await this.#disciplinaService.listar();  // pega todas
  return disciplinas
    .filter((d) => d.isConcluida())           // só as concluídas
    .reduce((total, d) => total + d.getCreditos(), 0);  // soma os créditos
}

async creditosRestantes() {
  const aluno = await this.buscar();          // pega perfil
  const concluidos = await this.creditosConcluidos();
  return Math.max(0, aluno.getCreditosNecessarios() - concluidos);
}
```

---

## 9. Logout — Navbar

```
Navbar.jsx
  ├── botão hambúrguer → setAberto(true) → sidebar abre
  ├── botão Sair (LogOut) → handleLogout()
  └── handleLogout():
       await logout()         ← signOut(auth) do AuthContext
       navigate("/login")
```

**O que acontece após `signOut`:**
1. Firebase limpa a sessão
2. `onAuthStateChanged` dispara com `null`
3. `AuthContext` seta `user = null`
4. Se estiver numa rota protegida, `RotaProtegida` vê `user === null` → redirect pra `/login`

---

## 10. Diagrama do fluxo completo

```
                          Firebase Auth
                              │
                    onAuthStateChanged
                              │
                              ▼
                    ┌─── AuthContext ───┐
                    │  user: User|null  │
                    │  uid: string      │
                    │  logout(): void   │
                    └────────┬──────────┘
                             │
           ┌─────────────────┼──────────────────┐
           │                 │                  │
     RotaProtegida     useAuth()           useAuth()
     (porteiro)        (páginas de         (hooks)
           │         auth)                    │
           │                 │           pega uid
    user=null?          Login.jsx            │
    → /login            Registro.jsx         │
    user=ok?            RecuperarSenha       │
    → renderiza              │               │
           │                 │               │
           ▼                 │         useDisciplinas()
      Home.jsx               │         useAluno()
      Disciplinas.jsx        │               │
      etc.                   │           instanciam
     useAluno()              │         Service(uid)
     useDisciplinas()        │               │
           │                 │         Service faz
     Hook chama              │         getDoc/getDocs
     Service.buscar()        │         addDoc/updateDoc
     Service.listar()        │         deleteDoc
           │                 │               │
     Service faz             │         Firestore
     getDoc/getDocs          │         users/{uid}
     no Firestore            │         users/{uid}/disciplinas
           │                 │               │
     Retorna Model           │               │
     (Aluno/Disciplina)      │         Service retorna
           │                 │         Disciplina.fromJSON
     Hook faz setState       │         Aluno.fromJSON
           │                 │               │
     Página re-renderiza ◄───┘─────────── Hook faz setState
     com dados reais                   Página re-renderiza
```

---

## Resumo das responsabilidades

| Camada | Sabe de quê | Não sabe de quê |
|---|---|---|
| **Model** (Disciplina, Aluno) | Seus próprios dados e regras | Firebase, React, UI |
| **Service** (DisciplinaService, AlunoService) | Firestore (CRUD), uid do usuário | React, UI, como os dados aparecem |
| **Hook** (useDisciplinas, useAluno) | React state, loading/error, chamar service | Firestore direto, detalhes do CRUD |
| **Context** (AuthContext) | Estado de auth global (user, uid, logout) | Firestore, UI, services |
| **Page** (Home, Disciplinas, etc.) | Renderizar UI, chamar hooks | Firestore, services, Firebase direto |
| **Component** (Navbar, Modal, RotaProtegida) | UI reutilizável, auth check | Firestore, services |

É isso. Cada camada só fala com a de baixo, ninguém pula.

---

*Fim do relatório.*