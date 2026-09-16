import { test, expect } from '@playwright/test'
import {
  login,
  nomeNoNavbar,
  linha,
  checkboxDaLinha,
  botaoConcluir,
  concluirSelecionadas,
  criarDisciplina,
  excluirDisciplina,
  limparDadosE2E,
} from './helpers/auth.js'
import { nomeUnico } from './helpers/env.js'

test.describe('Disciplinas — seleção e conclusão em lote', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
    await page.goto('/disciplinas')
    await expect(page.getByRole('heading', { name: 'Disciplinas adicionadas' })).toBeVisible()
  })

  test.afterAll(async ({ browser }) => {
    const page = await browser.newPage()
    await login(page)
    await limparDadosE2E(page)
    await page.close()
  })

  test('botão fica desabilitado sem seleção e habilita ao marcar', async ({ page }) => {
    const nome = nomeUnico(' A')
    await criarDisciplina(page, { nome })

    // Sem seleção: desabilitado
    await expect(botaoConcluir(page)).toBeDisabled()

    // Marca o checkbox da linha -> habilita
    await checkboxDaLinha(page, nome).click()
    await expect(botaoConcluir(page)).toBeEnabled()

    // Desmarca -> volta a desabilitar
    await checkboxDaLinha(page, nome).click()
    await expect(botaoConcluir(page)).toBeDisabled()

    await excluirDisciplina(page, nome)
  })

  test('marcar checkbox NÃO conclui a disciplina na hora', async ({ page }) => {
    const nome = nomeUnico(' B')
    await criarDisciplina(page, { nome })

    await checkboxDaLinha(page, nome).click()
    await expect(botaoConcluir(page)).toBeEnabled()

    // Ainda não deve aparecer em Concluídas
    await page.goto('/disciplinas-concluidas')
    await expect(linha(page, nome)).toHaveCount(0)

    await page.goto('/disciplinas')
    await excluirDisciplina(page, nome)
  })

  test('concluir remove a disciplina de "Em curso" e a move para Concluídas', async ({ page }) => {
    const nome = nomeUnico(' C')
    await criarDisciplina(page, { nome })

    // Está em "Em curso"
    await expect(linha(page, nome)).toBeVisible()

    await concluirSelecionadas(page, [nome])

    // Some de "Em curso" (a página lista só emCurso)
    await expect(linha(page, nome)).toHaveCount(0, { timeout: 20_000 })

    // E aparece em Concluídas
    await page.goto('/disciplinas-concluidas')
    await expect(linha(page, nome)).toBeVisible({ timeout: 20_000 })
  })

  test('conclui múltiplas de uma vez e os créditos somam', async ({ page }) => {
    const a = nomeUnico(' D1')
    const b = nomeUnico(' D2')
    const intacta = nomeUnico(' D3')
    await criarDisciplina(page, { nome: a, creditos: '30' })
    await criarDisciplina(page, { nome: b, creditos: '20' })
    await criarDisciplina(page, { nome: intacta, creditos: '70' })

    // Créditos antes
    await page.goto('/meus-creditos')
    const creditosAntes = Number(
      (await page.locator('span.text-6xl').first().innerText()).trim()
    )

    await page.goto('/disciplinas')
    await concluirSelecionadas(page, [a, b])

    // As duas somem de "Em curso"; a não selecionada permanece
    await expect(linha(page, a)).toHaveCount(0, { timeout: 20_000 })
    await expect(linha(page, b)).toHaveCount(0, { timeout: 20_000 })
    await expect(linha(page, intacta)).toBeVisible()

    // As duas aparecem em Concluídas
    await page.goto('/disciplinas-concluidas')
    await expect(linha(page, a)).toBeVisible({ timeout: 20_000 })
    await expect(linha(page, b)).toBeVisible({ timeout: 20_000 })

    // Créditos subiram exatamente 50 (30 + 20), não os 70 da intacta
    await page.goto('/meus-creditos')
    const creditosDepois = Number(
      (await page.locator('span.text-6xl').first().innerText()).trim()
    )
    expect(creditosDepois).toBe(creditosAntes + 50)

    await page.goto('/disciplinas')
    await excluirDisciplina(page, intacta)
  })
})

test.describe('Navbar — nome do aluno consistente entre páginas', () => {
  test('mesmo nome na Home, Disciplinas, Concluídas e Meus Créditos', async ({ page }) => {
    await login(page)

    const rotaETitulo = [
      ['/', 'Disciplinas em curso'],
      ['/disciplinas', 'Disciplinas adicionadas'],
      ['/disciplinas-concluidas', 'Disciplinas concluídas'],
      ['/meus-creditos', 'Meus créditos'],
    ]

    const nomes = []
    for (const [rota, titulo] of rotaETitulo) {
      await page.goto(rota)
      await expect(page.getByRole('heading', { name: titulo })).toBeVisible({ timeout: 20_000 })
      const nome = (await nomeNoNavbar(page).innerText()).trim()
      expect(nome, `nome vazio em ${rota}`).not.toBe('')
      expect(nome, `caiu no fallback em ${rota}`).not.toBe('Usuário')
      nomes.push({ rota, nome })
    }

    const distintos = [...new Set(nomes.map((n) => n.nome))]
    expect(distintos, `nome divergiu entre páginas: ${JSON.stringify(nomes)}`).toHaveLength(1)
  })
})
