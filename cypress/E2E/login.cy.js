
  it('Login executado', () => {
    cy.loginValido()
    cy.visit('/sistema')
    //cy.contains("home",{timeout:5000}).should('be.visible')

  })

   it('Login Invalido', () => {
    cy.loginInvalido()
    cy.get('.card-notification').should('contain.text', 'Código de empresa, usuário ou senha inválidos.')
  })
   


