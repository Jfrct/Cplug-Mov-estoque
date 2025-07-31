import { faker } from '@faker-js/faker'

describe('Cria Produto', () => {
  const produto = {
    nome: faker.commerce.productName(),
    preco: faker.commerce.price(1, 100),
    quantidade: faker.number.int({ min: 1, max: 100 })
  }

  beforeEach(() => {


    cy.login()
    cy.visit('/sistema/produtos')
  })
  let estoqueInicial = [];

  it('Verifica e guarda o estoque do produto antes da venda', () => {
    cy.cadastrarProduto(produto);
    cy.visit('/sistema/produtos');

    cy.get(':nth-child(5) > .center > .text-nowrap') // atualize com seletor exato
      .each(($el, index) => {
        const valorTexto = $el.text().trim();
        cy.wrap($el).should('be.visible');
        const valorNumerico = parseFloat(valorTexto.replace('.', '').replace(',', '.'));
        estoqueInicial.push(valorNumerico);
        cy.log(`Estoque inicial do item ${index}: ${valorNumerico}`)
        console.log(`Estoque inicial do item ${index}: ${valorNumerico}`)
      })
  })
})