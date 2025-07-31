//LOGIN


Cypress.Commands.add('login', () => {
  const user = Cypress.env('user_name')
  const password = Cypress.env('user_password')
  const pass = Cypress.env('acess_pass')

  cy.visit('/login')
  
  cy.get('.form-login > .card-body > :nth-child(2) > .custom-input').type(pass)
  cy.get('.form-login > .card-body > :nth-child(3) > .custom-input').type(user)
  cy.get(':nth-child(4) > .custom-input').type(password)
  cy.get(':nth-child(5) > .w-full').click()
})




// Cadastra Produto e estoca
Cypress.Commands.add('cadastrarProduto', (produto) => {
  cy.visit('/sistema/produtos')
  cy.wait(1000)
  cy.get('.col-md-6 > :nth-child(1) > .btn-success').click()
  cy.get('#name').type(produto.nome)
  cy.get('#value').type(produto.preco)
  cy.get(':nth-child(2) > .input-group > .input-group-btn > .btn-primary').click()
  cy.get('#flg_stock_control')
    .should('have.value', '1')
  cy.get('#btn-save-and-stock').click()
  cy.wait(2000)
  cy.contains('#select2-id_stock-container', 'Estoque 1 (TESTE QA 5)');
  cy.get('input[name="product[1][amount]"]')
    .clear()
    .type('50,00')
  cy.get('input[name="product[1][cost]"]')
  .clear() 
  .type('12,50') 
  cy.get('button.btn-green')
  .contains('Salvar')
  .click()

})

// Cadastra Venda e verifica estoque final

/*Cypress.commands.add('cadastrarVenda', (produto) => {
  cy.visit('/sistema/vendas/nova')
  cy.wait(1000)
  cy.get('#select2-products1id_product-0z-container') 
  .click();


cy.get('.select2-search__field')
  .type(produto.nome)


cy.get('.select2-results__option')
  .contains(produto.nome)
  .click()*/

