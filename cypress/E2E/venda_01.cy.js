import { faker } from '@faker-js/faker'

describe('Cria Produto', () => {
  const produto = {
    nome: faker.commerce.productName(),
    preco: faker.commerce.price(1, 100),
    quantidade: faker.number.int({ min: 1, max: 100 })
  }

  beforeEach(() => {
    // Bloqueador de requests, a fim de tornar testes mais rapidos, retirado apenas se necessario verificação de requests
  
    cy.login()
    cy.cadastrarProduto(produto);
    // Acessa a página de produtos para verificar o estoque
    cy.visit('/sistema/produtos')
  })

  it('Realiza venda e verifica o estoque', () => {
    const estoqueInicial = [];
    cy.get(':nth-child(5) > .center > .text-nowrap') // atualize com seletor exato
      .each(($el, index) => {
        const valorTexto = $el.text().trim();
        cy.wrap($el).should('be.visible');
        const valorNumerico = parseFloat(valorTexto.replace('.', '').replace(',', '.'));
        estoqueInicial.push(valorNumerico);
        cy.log(`Estoque inicial do item ${index}: ${valorNumerico}`)
        console.log(`Estoque inicial do item ${index}: ${valorNumerico}`)
      })

    cy.cadastrarVenda(produto);
  })
})