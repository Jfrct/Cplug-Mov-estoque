import { faker } from '@faker-js/faker'

describe('Cria Produto', () => {
  const produto = {
    nome: faker.commerce.productName(),
    nome2: faker.commerce.productName(),
    preco: faker.commerce.price(1, 100),
    quantidade: faker.number.int({ min: 1, max: 100 })
  }


  Cypress.Commands.add('loginValido', () => {

    cy.visit('/login')
    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')
    const code = Cypress.env('login_code')


    cy.get('input[name="login_code"]').click().type(code)
    cy.get('input[name="username"]').click().type(user)
    cy.get('input[name="password"]').click().type(password)
    cy.get('button.btn-submit[type="submit"]').click()
  })

  Cypress.Commands.add('loginInvalido', () => {

    cy.visit('/login')

    cy.get('input[name="login_code"]').click().type('1234')
    cy.get('input[name="username"]').click().type('user2')
    cy.get('input[name="password"]').click().type(`password`)
    cy.get('button.btn-submit[type="submit"]').click()
  })

  Cypress.Commands.add('cadastrarProdutoEstoque1', (produto) => {
    cy.visit('/sistema/produto/novo/produto')
    cy.get('#name').type(produto.nome)
    cy.get('#value').type(produto.preco)
    cy.get(':nth-child(2) > .input-group > .input-group-btn > .btn-primary').click()
    cy.get('#flg_stock_control').should('have.value', '1')
    cy.get('#btn-save-and-stock').click();
    cy.contains('#select2-id_stock-container', 'Estoque 1 (TESTE QA 5)')
    cy.get('input[name="product[1][amount]"]')
      .clear()
      .type('10,0')
    cy.get('input[name="product[1][cost]"]')
      .clear()
      .type('12,50')
    cy.get('button.btn-green')
      .contains('Salvar')
      .click()


  })

  Cypress.Commands.add('cadastrarProduto0', (produto) => {
    cy.visit('/sistema/produto/novo/produto')
    cy.get('#name').type(produto.nome2)
    cy.get('#value').type(produto.preco)
    cy.get(':nth-child(2) > .input-group > .input-group-btn > .btn-primary').click()
    cy.get('select[name="flg_stock_control"]').select('0');
    cy.get('#btn-save-and-stock').click();
    cy.contains('#select2-id_stock-container', 'Estoque 1 (TESTE QA 5)')
    cy.get('input[name="product[1][amount]"]')
      .clear()
      .type('10,0')
    cy.get('input[name="product[1][cost]"]')
      .clear()
      .type('12,50')
    cy.get('button.btn-green')
      .contains('Salvar')
      .click()

  })

  
Cypress.commands.add('cadastrarVenda', (produto) => {
  cy.visit('/sistema/vendas/nova')
  cy.get('#select2-products1id_product-0z-container') 
  .click();
cy.get('.select2-search__field')
  .type(produto.nome)
cy.get('.select2-results__option')
  .contains(produto.nome)
  .click()


})
})




