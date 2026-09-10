# Trilha Acadêmica

Protótipo de um sistema de planejamento acadêmico. O aluno cadastra suas disciplinas,
marca as concluídas e o sistema calcula quais disciplinas estão disponíveis para cursar
(pré-requisitos cumpridos) e quantos créditos faltam para a formatura.

Stack: **React + Firebase (Firestore) + React Router DOM + shadcn/ui**

---

## Como instalar e rodar

Pré-requisitos: Node.js 18+ instalado.

```bash
# 1. Entrar na pasta do projeto
cd trilha-academica

# 2. Instalar dependências (já vem com firebase, react-router-dom e shadcn/ui inclusos)
npm install

# 3. Rodar o projeto em modo dev
npm run dev
```

O Vite sobe o servidor em `http://localhost:5173` (hot reload ativo).

```bash
# 4. Build de produção (gera pasta dist/ com os arquivos finais)
npm run build

# 5. Pré-visualizar o build
npm run preview
```

---

## Dependências principais

- `firebase` — SDK do Firebase (Firestore + Auth)
- `react-router-dom` — roteamento entre as páginas do app
- `tailwindcss`, `@tailwindcss/vite`, `lucide-react`, `@radix-ui/react-slot`,
  `class-variance-authority`, `clsx`, `tailwind-merge` — base do **shadcn/ui**

Para adicionar mais componentes do shadcn/ui no futuro, use:

```bash
npx shadcn@latest add <nome-do-componente>
# exemplo:
npx shadcn@latest add button card input label
```

Os componentes já presentes estão em `src/components/ui/`.

---

## Estrutura de Pastas

```
trilha-academica/
├── public/                     ← arquivos estáticos (imagens, ícones)
│
├── src/
│   ├── config/
│   │   └── firebase.js         ← configuração do Firebase (chaves do projeto)
│   │
│   ├── models/                 ← CLASSES DE DOMÍNIO (nossos objetos OO)
│   │   ├── Disciplina.js       ← classe Disciplina
│   │   └── Aluno.js            ← classe Aluno
│   │
│   ├── services/               ← CLASSES DE SERVIÇO (falam com o Firestore)
│   │   ├── DisciplinaService.js
│   │   └── AlunoService.js
│   │
│   ├── components/             ← componentes reutilizáveis
│   │   ├── ui/                 ← componentes do shadcn/ui
│   │   │   ├── button.jsx
│   │   │   ├── button-variants.js
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   └── label.jsx
│   │   ├── DisciplinaCard.jsx
│   │   ├── DisciplinaForm.jsx
│   │   └── ...
│   │
│   ├── pages/                  ← telas/páginas do app (uma por rota)
│   │   └── TesteTema.jsx       ← página de teste do tema (/teste)
│   │
│   ├── components/             ← componentes reutilizáveis
│   │   ├── ui/                 ← componentes do shadcn/ui
│   │   │   ├── button.jsx
│   │   │   ├── button-variants.js
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   └── label.jsx
│   │   ├── RotaProtegida.jsx   ← envolve rotas que exigem login
│   │   └── ...
│   │
│   ├── App.jsx                 ← componente raiz (RouterProvider)
│   ├── routes.jsx              ← configuração das rotas (createBrowserRouter)
│   ├── App.css
│   ├── main.jsx                ← entrypoint do React
│   └── index.css               ← estilos globais e tema
│
├── components.json             ← configuração do shadcn/ui
├── package.json
└── vite.config.js
```

---

## Rotas

As rotas são configuradas em `src/routes.jsx` usando `createBrowserRouter` do **React Router DOM v7**. O `src/App.jsx` apenas entrega esse router via `RouterProvider`.

| Rota | Página | O que mostra |
|------|--------|--------------|
| `/` | — | Redireciona para `/teste` |
| `/teste` | TesteTema | Demonstração do tema, tipografia e componentes shadcn |
| `*` | — | Qualquer rota desconhecida redireciona para `/teste` |

Exemplo de como adicionar uma nova rota (com proteção de login):

```jsx
import { createBrowserRouter, Navigate } from "react-router-dom"
import RotaProtegida from "@/components/RotaProtegida"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import CadastroDisciplinas from "@/pages/CadastroDisciplinas"

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  {
    path: "/disciplinas",
    element: (
      <RotaProtegida>
        <CadastroDisciplinas />
      </RotaProtegida>
    ),
  },
  { path: "*", element: <Navigate to="/" replace /> },
])
```

---

## Componentes shadcn/ui disponíveis

Atualmente o projeto já conta com os seguintes componentes do shadcn/ui em `src/components/ui/`:

| Componente | Arquivo | Descrição |
|------------|---------|-----------|
| Button | `button.jsx` + `button-variants.js` | Botão com variantes: default, secondary, destructive, outline, ghost, link |
| Card | `card.jsx` | Container de conteúdo com header, title, description, content e footer |
| Input | `input.jsx` | Campo de texto estilizado |
| Label | `label.jsx` | Rótulo para inputs |

Utilitário compartilhado:

- `src/lib/utils.js` — função `cn()` para concatenar classes do Tailwind.

Exemplo de uso:

```jsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function Exemplo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Título</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="primary">Salvar</Button>
      </CardContent>
    </Card>
  )
}
```

### Proteção de rotas (`RotaProtegida`)

O componente `src/components/RotaProtegida.jsx` verifica se o usuário está logado via Firebase Auth. Enquanto verifica, exibe "Carregando..."; se não houver usuário, redireciona para `/login`; caso contrário, renderiza a rota normalmente.

```jsx
import RotaProtegida from "@/components/RotaProtegida"
import CadastroDisciplinas from "@/pages/CadastroDisciplinas"

{
  path: "/disciplinas",
  element: (
    <RotaProtegida>
      <CadastroDisciplinas />
    </RotaProtegida>
  ),
}
```

---

## O que vai em cada pasta (e por quê)

### `src/config/`

Configuração e inicialização do Firebase. O `firebase.js` importa as funções do SDK,
passa as chaves do projeto e exporta `db` (instância do Firestore) e `auth` (Authentication).
Tudo que precisa do Firebase importa daqui.

### `src/models/`

As classes de domínio — nossos objetos de negócio. São classes puras, sem dependência
do Firebase. Encapsulam os dados e a lógica de cada entidade:

- `Disciplina.js` — representa uma disciplina (nome, créditos, concluída, pré-requisitos)
- `Aluno.js` — representa o perfil do aluno (nome, curso, período, créditos necessários)

### `src/services/`

As classes de serviço — a ponte entre o app e o Firestore. Cada service encapsula
as operações de banco para uma entidade, recebendo o `uid` do usuário logado:

- `DisciplinaService.js` — CRUD de disciplinas + listarDisponiveis()
- `AlunoService.js` — salvar/buscar perfil + cálculos de créditos

### `src/components/`

Componentes React reutilizáveis que aparecem em mais de uma tela (cards, formulários,
inputs customizados, etc). Um componente = um arquivo. A subpasta `ui/` contém os
componentes do shadcn/ui.

### `src/pages/`

Cada tela do protótipo vira um arquivo aqui. A página orquestra: pega dados do service,
monta os componentes, renderiza a UI. Cada página geralmente está associada a uma rota.

### `src/routes.jsx`

Centraliza a configuração das rotas do `react-router-dom` usando `createBrowserRouter`. É aqui que cada caminho é associado a uma página, e onde as rotas protegidas envolvem seus componentes com `RotaProtegida`.

### `src/App.jsx`

Ponto de entrada da aplicação. Renderiza `RouterProvider` passando o `router` criado em `src/routes.jsx`.

```jsx
import { RouterProvider } from "react-router-dom"
import { router } from "./routes"

function App() {
  return <RouterProvider router={router} />
}

export default App
```

### Por que essa separação?

- **models** não sabem que o Firestore existe → ficam fáceis de testar e reusar
- **services** isolam o Firebase → se amanhã trocar pra outro banco, só mexe aqui
- **pages/components** só lidam com UI → não acessam Firestore diretamente
- Isso é o conceito de **separação de responsabilidades** (OO + camadas)

---

## Tema visual

O tema está definido em `src/index.css` com:

- Paleta **primary** em tons de verde (100–900)
- Paleta **regular** em tons de cinza
- Paleta **tertiary** em tons de marrom
- Tipografia: **Inter, Roboto, DM Sans**
- Tamanhos de heading, labels e paragraphs
- Spacing tokens (2px até 112px)
- **Border-radius fixo em 20px** em todos os componentes

---

## Firebase — Configuração (LEIA ANTES DE RODAR)

O projeto Firebase já está criado: `paradigmas-8f1cb`.

IMPORTANTE: O arquivo `src/config/firebase.js` **NÃO está no repositório** (está no
`.gitignore`). Ele contém as chaves do projeto Firebase e não deve ser commitado.

### Passo a passo para configurar

1. Copie o arquivo template:

   ```
   src/config/firebase.example.js  →  src/config/firebase.js
   ```

2. Abra `src/config/firebase.js` e preencha os valores que estão marcados como
   `COLE_AQUI_*` com as chaves reais do projeto Firebase.

3. As chaves você encontra no drive: `https://drive.google.com/drive/folders/1Pj_UWWnqb5dvns6_rpXNEb2Ee_B84_uH`

4. Pronto. Agora `npm run dev` deve conectar ao Firestore.

Estrutura no Firestore:

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
  └── prerequisitos: string[]
```

## Scripts disponíveis

| Script           | O que faz                                  |
|------------------|--------------------------------------------|
| `npm run dev`    | Servidor de desenvolvimento (hot reload)    |
| `npm run build`  | Build de produção → pasta `dist/`           |
| `npm run preview`| Servidor pra pré-visualizar o build         |
| `npm run lint`   | Linter (oxlint)                            |
