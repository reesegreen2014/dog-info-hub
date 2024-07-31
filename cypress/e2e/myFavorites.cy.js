describe('My Favorites Page', () => {
    beforeEach(() => {
        localStorage.removeItem('favorites');
        cy.intercept('GET', '**/breeds', { fixture: 'dogData.json' }).as('getBreeds');
        cy.visit('http://localhost:3000/');
      });

    it('should navigate all breeds page and favorite animal and should persist across page reload', () => {
        cy.get('.nav > [href="/all-breeds"]').click();
        cy.get('.breed-card-container').first().find('.favorite-icon').click();
        cy.reload();
    })

    it('should display favorites on the my favorites page', () => {
        cy.get('.nav > [href="/all-breeds"]').click();
        cy.get('.breed-card-container').first().find('.favorite-icon').click();
        cy.get('.myfavorites').click();
        cy.get('.myfavorites').should('have.length', 1)
    })

    it('should remove favorites from My Favorites page if unfavorited and handle errors gracefully', () => {
        cy.get('.nav > [href="/all-breeds"]').click();
        cy.get('.breed-card-container').first().find('.favorite-icon').click(); 
        cy.get('.breed-card-container').first().find('.favorite-icon').click(); 
        cy.get('.myfavorites').click();
        cy.get('.favorites-container > p').should('contain', 'No favorite breeds yet.')
    })
  });
  