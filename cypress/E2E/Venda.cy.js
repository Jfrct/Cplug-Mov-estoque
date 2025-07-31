import { faker } from '@faker-js/faker'

describe('Cria Produto', () => {
  const produto = {
    nome: faker.commerce.productName(),
    preco: faker.commerce.price(1, 100)
  }
  
  beforeEach(() => {
    // Bloqueia requests para serviços de terceiros
    cy.intercept('POST', 'https://sessions.bugsnag.com/*', { statusCode: 204, body: {} })
    cy.intercept('POST', 'https://www.google-analytics.com/*', { statusCode: 204, body: {} })
    cy.intercept('POST', 'https://analytics.google.com/*', { statusCode: 204, body: {} })
    cy.intercept('GET', 'https://px.ads.linkedin.com/*', { statusCode: 204, body: {} })
    cy.intercept('GET', 'https://www.facebook.com/*', { statusCode: 204, body: {} })

    // Seus intercepts da API
    cy.intercept('GET', '/api/*', { statusCode: 200, body: [] })
    cy.intercept('POST', '/api/*', { statusCode: 200, body: {} })
    cy.intercept('PUT', '/api/*', { statusCode: 200, body: {} })
    cy.intercept('DELETE', '/api/*', { statusCode: 200, body: {} })

    cy.login()
    cy.visit('/sistema/produtos')
  })

  it('Realiza Venda', () => {
    cy.cadastrarProduto(produto)
    //cy.contains(produto.name).should('be.visible') // Garante que o produto foi cadastrado
    // Adicione aqui os comandos para realizar a venda, se necessário
  })
})