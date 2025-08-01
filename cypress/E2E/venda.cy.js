import { faker } from "@faker-js/faker";

describe("Cria Produto", () => {
  const produto = {
    nome: faker.commerce.productName(),
    preco: faker.commerce.price(1, 100),
    quantidade: faker.number.int({ min: 1, max: 100 }),
  };

  beforeEach(() => {
    cy.loginValido();
  });

  it("Realiza venda com estoque", () => {
    cy.cadastrarProdutoEstoque1(produto).then(() => {
      const codigo = Cypress.env("codigoProduto");
      cy.log(`Código armazenado: ${codigo}`);

      cy.visit("/sistema/vendas/nova");
      cy.get(".product-area-select .select2-selection--single").click();
      cy.get(".select2-search__field").type(produto.nome, { force: true });
      cy.get(".select2-results__option").contains(produto.nome).click();
      cy.get(".product-area-select .select2-selection__rendered").should(
        "contain",
        produto.nome
      );
      cy.get(".amount-area input.amount").click().type("100,00");
      cy.get("button.btn.btn-lg.btn-green.pull-left").click();
      cy.visit("/sistema/estoque/total/12");
      cy.get("#pm-search").type(codigo);
      cy.get("#pm-btn-search").click();
      cy.get("fa.fa-search").click();
    });
  });
});
