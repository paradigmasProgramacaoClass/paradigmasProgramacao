# Trilha Acadêmica

Protótipo de um sistema de planejamento acadêmico. O aluno cadastra suas disciplinas,
marca as concluídas e o sistema calcula quais disciplinas estão disponíveis para cursar
(pré-requisitos cumpridos) e quantos créditos faltam para a formatura.

Stack: **React + Firebase (Firestore)**

---

## Como instalar e rodar

Pré-requisitos: Node.js 18+ instalado.

```bash
# 1. Entrar na pasta do projeto
cd trilha-academica

# 2. Instalar dependências (já vem com firebase incluso)
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

## Estrutura de Pastas

```
trilha-academica/
├── public/                     ← arquivos estáticos (imagens, ícones)
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
│   ├── components/              ← componentes reutilizáveis (botões, cards, inputs)
│   │   ├── DisciplinaCard.jsx
│   │   ├── DisciplinaForm.jsx
│   │   └── ...
│   │
│   ├── pages/                  ← telas/páginas do app (uma por rota)
│   │   ├── Login.jsx
│   │   ├── Cadastro.jsx
│   │   ├── Home.jsx
│   │   ├── CadastroDisciplinas.jsx
│   │   ├── DisciplinasConcluidas.jsx
│   │   ├── RecuperarSenha.jsx
│   │   └── Resultado.jsx
│   │
│   ├── App.jsx                 ← componente raiz (rotas, layout)
│   ├── App.css
│   ├── main.jsx                ← entrypoint do React
│   └── index.css               ← estilos globais
│
├── package.json
└── vite.config.js
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
inputs customizados, etc). Um componente = um arquivo.

### `src/pages/`

Cada tela do protótipo vira um arquivo aqui. A página orquestra: pega dados do service,
monta os componentes, renderiza a UI.

### Por que essa separação?

- **models** não sabem que o Firestore existe → ficam fáceis de testar e reusar
- **services** isolam o Firebase → se amanhã trocar pra outro banco, só mexe aqui
- **pages/components** só lidam com UI → não acessam Firestore diretamente
- Isso é o conceito de **separação de responsabilidades** (OO + camadas)

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
| `npm run lint`   | Linter (eslint)                            |
