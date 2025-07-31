import { faker } from '@faker-js/faker'

describe('Cria Produto', () => {
  const produto = {
    nome: faker.commerce.productName(),
    nome2: faker.commerce.productName(),
    preco: faker.commerce.price(1, 100),
    quantidade: faker.number.int({ min: 1, max: 100 })
  }

  beforeEach(() => {


    cy.loginValido()
    cy.visit('/sistema/produtos')
  })

  it('Crias e verifica se produto foi criado para movimentar estoque', () => {
    cy.cadastrarProdutoEstoque1(produto);
    cy.contains('a', produto.nome)
       .should('have.attr', 'href')
    /*cy.get(':nth-child(5) > .center > .text-nowrap') 
      .each(($el, index) => {
        const valorTexto = $el.text().trim();
        cy.wrap($el).should('be.visible');
        const valorNumerico = parseFloat(valorTexto.replace('.', '').replace(',', '.'));
        estoqueInicial.push(valorNumerico);
        cy.log(`Estoque inicial do item ${index}: ${valorNumerico}`)
        console.log(`Estoque inicial do item ${index}: ${valorNumerico}`)*/
      })


      
    it('Crias e verifica se produto foi criado NÃO para movimentar estoque', () => {
    cy.cadastrarProduto0(produto);
    cy.contains('a', produto.nome2)
       .should('have.attr', 'href')
    /*cy.get(':nth-child(5) > .center > .text-nowrap') 
      .each(($el, index) => {
        const valorTexto = $el.text().trim();
        cy.wrap($el).should('be.visible');
        const valorNumerico = parseFloat(valorTexto.replace('.', '').replace(',', '.'));
        estoqueInicial.push(valorNumerico);
        cy.log(`Estoque inicial do item ${index}: ${valorNumerico}`)
        console.log(`Estoque inicial do item ${index}: ${valorNumerico}`)*/
      })
  })
