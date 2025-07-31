
  it('Login executado', () => {
    cy.login()
    cy.visit('/sistema')
    cy.wait(1000) // Aguarda o carregamento da página
    cy.contains("home").should('be.visible')

  })

