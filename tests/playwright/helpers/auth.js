import { expect } from '@playwright/test'
import { E2E_EMAIL, E2E_PASSWORD, MARCA_E2E } from './env.js'

/** Faz login via email/senha (Auth do Firebase) e espera a Home. */
export async function login(page) {
  await page.goto('/login')
  await page.fill('#email', E2E_EMAIL)
  await page.fill('#senha', E2E_PASSWORD)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()

  await expect(page.getByRole('heading', { name: 'Disciplinas em curso' })).toBeVisible({
    timeout: 30_000,
  })
}

/** Nome do aluno exibido no Navbar (span ao lado do avatar). */
export function nomeNoNavbar(page) {
  return page.locator('nav').locator('span.text-sm.font-medium').first()
}

/** Overlay de qualquer modal aberto. */
export function modal(page) {
  return page.locator('.fixed.inset-0.z-50')
}

/** Linha da tabela cujo texto contém `texto`. */
export function linha(page, texto) {
  return page.locator('tbody tr').filter({ hasText: texto })
}

/** Checkbox de seleção da linha é o primeiro <div> da primeira célula. */
export function checkboxDaLinha(page, texto) {
  return linha(page, texto).locator('td').first().locator('div').first()
}

/** Botão "Marcar como concluída" (bulk). */
export function botaoConcluir(page) {
  return page.getByRole('button', { name: 'Marcar como concluída' })
}

/**
 * Clica num botão de confirmação do modal e espera o modal fechar.
 *
 * CRÍTICO: as ações (deleteDoc) são async e só fecham o modal DEPOIS de
 * persistir no Firestore. Navegar antes disso cancela a escrita — por isso
 * nunca dê page.goto() logo após o clique sem esperar aqui.
 */
export async function confirmarModal(page, nomeBotao) {
  await modal(page).getByRole('button', { name: nomeBotao }).click()
  await expect(modal(page)).toBeHidden({ timeout: 20_000 })
}

/**
 * Marca as disciplinas indicadas e clica no botão de concluir.
 *
 * IMPORTANTE: a implementação atual (do colega) NÃO tem modal de confirmação —
 * o clique dispara um loop de `toggleConcluida` (um updateDoc por disciplina),
 * e cada iteração recarrega a lista. A seleção é limpa no fim do loop, então o
 * botão voltar a ficar desabilitado é o sinal de que as escritas terminaram.
 * Navegar antes disso cancela as escritas em voo.
 */
export async function concluirSelecionadas(page, nomes) {
  for (const nome of nomes) {
    await checkboxDaLinha(page, nome).click()
  }
  await botaoConcluir(page).click()
  await expect(botaoConcluir(page)).toBeDisabled({ timeout: 30_000 })
}

/** Cria uma disciplina pelo modal "Adicionar disciplina". */
export async function criarDisciplina(page, { nome, professor = 'Prof. E2E', creditos = '40' }) {
  await page.getByRole('button', { name: 'Adicionar disciplina' }).click()
  await page.getByPlaceholder('Ex: Redes Neurais').fill(nome)
  await page.getByPlaceholder('Ex: Cicrano Blau').fill(professor)
  await page.getByPlaceholder('Ex: 200').fill(creditos)
  await page.getByRole('button', { name: 'Salvar' }).click()

  await expect(linha(page, nome)).toBeVisible({ timeout: 20_000 })
}

/** Exclui uma disciplina pela lixeira + modal de confirmação. */
export async function excluirDisciplina(page, nome) {
  const alvo = linha(page, nome)
  if ((await alvo.count()) === 0) return

  await alvo.locator('button').last().click()
  await confirmarModal(page, 'Excluir')
  await expect(alvo).toHaveCount(0, { timeout: 20_000 })
}

/**
 * Remove tudo que os testes criaram (prefixo [E2E]).
 *
 * Por que via Firestore REST e não pela UI: as concluídas SOMEM de /disciplinas
 * (a página lista só `emCurso`) e /disciplinas-concluidas não tem botão de
 * excluir — os itens concluídos ficariam órfãos na conta real.
 *
 * Usa o ID token do PRÓPRIO usuário logado (extraído do módulo do app), então
 * respeita as mesmas security rules da UI: nenhum privilégio extra, e só toca
 * em documentos marcados com [E2E].
 */
export async function limparDadosE2E(page) {
  return page.evaluate(async (marca) => {
    const { auth } = await import('/src/config/firebase.js')
    if (!auth?.currentUser) throw new Error('cleanup: sem currentUser')

    const { uid } = auth.currentUser
    const token = await auth.currentUser.getIdToken()
    const headers = { Authorization: `Bearer ${token}` }
    const base = `https://firestore.googleapis.com/v1/projects/paradigmas-8f1cb/databases/(default)/documents/users/${uid}/disciplinas`

    const lista = await (await fetch(`${base}?pageSize=300`, { headers })).json()
    const alvos = (lista.documents || []).filter((d) =>
      (d.fields?.nome?.stringValue || '').includes(marca)
    )

    for (const d of alvos) {
      await fetch(`https://firestore.googleapis.com/v1/${d.name}`, { method: 'DELETE', headers })
    }
    return alvos.map((d) => d.fields.nome.stringValue)
  }, MARCA_E2E)
}
