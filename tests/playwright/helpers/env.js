import fs from 'node:fs'
import path from 'node:path'

/**
 * Lê .env.test (gitignored) sem depender de dotenv.
 * Credenciais do usuário E2E vivem lá — nunca no código fonte.
 */
function carregar() {
  const arquivo = path.join(process.cwd(), '.env.test')
  const vars = {}
  if (!fs.existsSync(arquivo)) return vars

  for (const linha of fs.readFileSync(arquivo, 'utf8').split('\n')) {
    const limpa = linha.trim()
    if (!limpa || limpa.startsWith('#')) continue
    const i = limpa.indexOf('=')
    if (i === -1) continue
    vars[limpa.slice(0, i).trim()] = limpa.slice(i + 1).trim()
  }
  return vars
}

const env = carregar()

export const E2E_EMAIL = process.env.E2E_EMAIL || env.E2E_EMAIL
export const E2E_PASSWORD = process.env.E2E_PASSWORD || env.E2E_PASSWORD

/** Prefixo dos dados criados pelos testes — usado no cleanup. */
export const MARCA_E2E = '[E2E]'

/** Nome único por execução, pra não colidir com resíduos de runs anteriores. */
export function nomeUnico(sufixo = '') {
  return `${MARCA_E2E} ${Date.now().toString().slice(-6)}${sufixo}`
}

if (!E2E_EMAIL || !E2E_PASSWORD) {
  throw new Error(
    'Credenciais E2E ausentes. Crie .env.test com E2E_EMAIL=... e E2E_PASSWORD=... (veja .env.test.example)'
  )
}
