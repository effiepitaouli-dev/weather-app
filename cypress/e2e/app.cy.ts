describe('Location form', () => {
    it('Should load the location form', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
  
      cy.get('form.grid')
    })
  })

  export {}