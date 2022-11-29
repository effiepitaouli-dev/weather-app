describe('Location form', () => {
    it('Should load the location form', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
  
      cy.get('form.grid')
    })
    it('Should change the theme', () => {
      cy.visit('http://localhost:3000/');

      cy.wait(1000);
      const checkbox = cy.get('input#dark-theme');
      const body = cy.get('body');
      checkbox.should('exist');
      body.should('exist');

      // if (checkbox.invoke('attr', 'checked')) {
      //   checkbox.uncheck();
      //   body.should('have.class', 'theme-light');
      // } else {
      //   checkbox.check();
      //   body.should('have.class', 'theme-dark');
      // }
      
    })
  })

  export {}