//LOGIN


Cypress.Commands.add('login', () => {
  const user = Cypress.env('user_name')
  const password = Cypress.env('user_password')
  const pass = Cypress.env('acess_pass')

  cy.visit('/login')
cy.intercept({ method: 'GET', url: '/api/*' }, (req) => {
      req.reply({ statusCode: 200, body: [] })
    })
    cy.intercept({ method: 'POST', url: '/api/*' }, (req) => {
      req.reply({ statusCode: 200, body: {} })
    })
    cy.intercept({ method: 'PUT', url: '/api/*' }, (req) => {
      req.reply({ statusCode: 200, body: {} })
    })
    cy.intercept({ method: 'DELETE', url: '/api/*' }, (req) => {
      req.reply({ statusCode: 200, body: {} })
    })
  cy.get('.form-login > .card-body > :nth-child(2) > .custom-input').type(pass)
  cy.get('.form-login > .card-body > :nth-child(3) > .custom-input').type(user)
  cy.get(':nth-child(4) > .custom-input').type(password)
  cy.get(':nth-child(5) > .w-full').click()
})




// Cadastra Produto
Cypress.Commands.add('cadastrarProduto', (produto) => {
  cy.visit('/sistema/produtos')
  cy.wait(1000)
  cy.get('.col-md-6 > :nth-child(1) > .btn-success').click()
  cy.get('#name').type(produto.nome)
  cy.get('#value').type(produto.preco)
  cy.get(':nth-child(2) > .input-group > .input-group-btn > .btn-primary').click()
  cy.get('#flg_stock_control')
  .should('have.value', '1'); //'1' representa a opção "Sim"
  cy.get('#btn-save-and-stock').click()
  cy.wait(2000)
  cy.contains('#select2-id_stock-container', 'Estoque 1 (TESTE QA 5)');
  //cy.contains('#select2-product_select_first-container', (produto.name).should('be.visible'));
  cy.get('.select2-search__field').type(produto.quantidade.toString())
  cy.get('.select2-results__option').first().click()
  cy.get('[style="display: block;"] > .stock-unitary-cost > .form-control').click().type(produto.preco)
   cy.get('#btn-submit').click();
})