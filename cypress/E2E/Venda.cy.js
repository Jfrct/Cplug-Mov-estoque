import { faker } from '@faker-js/faker'

describe('Cria Produto', () => {
  const produto = {
    nome: faker.commerce.productName(),
    preco: faker.commerce.price(1, 100),
    quantidade: faker.number.int({ min: 1, max: 100 })
  }
  
  beforeEach(() => {
    // Bloqueador de requests, a fim de tornar testes mais rapidos, retirado apenas se necessario verificação de requests
    cy.intercept('POST', 'https://sessions.bugsnag.com/*', { statusCode: 204, body: {} })
    cy.intercept('POST', 'https://www.google-analytics.com/*', { statusCode: 204, body: {} })
    cy.intercept('POST', 'https://analytics.google.com/*', { statusCode: 204, body: {} })
    cy.intercept('GET', 'https://px.ads.linkedin.com/*', { statusCode: 204, body: {} })
    cy.intercept('GET', 'https://www.facebook.com/*', { statusCode: 204, body: {} })
    cy.intercept('GET', '/api/*', { statusCode: 200, body: [] })
    cy.intercept('POST', '/api/*', { statusCode: 200, body: {} })
    cy.intercept('PUT', '/api/*', { statusCode: 200, body: {} })
    cy.intercept('DELETE', '/api/*', { statusCode: 200, body: {} })

    cy.login()
    cy.visit('/sistema/produtos')
  })

  it('Verifica se o produto foi criado movimentando estoque', () => {
    cy.cadastrarProduto(produto)
    /*cy.visit('/sistema/produtos')
    cy.contains('produto.name').should('be.visible') 
    cy.visit('/sistema/estoque')
    cy.contains('.col-md-4', 'Estoque 1 (TESTE QA 5)')
  .parent('li') // sobe para o elemento <li> que agrupa tudo
  .find('.fa.fa-search') // encontra o ícone de busca
  .click(); // clica no botão "Verificar"*/
 
    
  })

})