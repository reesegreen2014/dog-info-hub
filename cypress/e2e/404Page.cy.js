describe('404 Page Not Found', () => {
    it('should display the 404 page for an unknown route', () => {
      cy.visit('http://localhost:3000/unknown-route');
      cy.get('.not-found-container').should('be.visible');
      cy.get('.not-found-container h1').should('contain', '404');
      cy.get('.not-found-container p').should('contain', 'Page Not Found');
      cy.get('.not-found-container a').should('contain', 'Go Back Home');
      cy.get('img').should('exist');
    });
  });
  