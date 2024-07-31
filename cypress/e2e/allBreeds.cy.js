describe('All Breeds Page', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/breeds', { fixture: 'dogdata.json' }).as('getBreeds');
      cy.visit('http://localhost:3000/all-breeds');
    });
  
    it('should display the search bar and filter button', () => {
      cy.get('.search-bar').should('be.visible');
      cy.get('.filter-button').should('be.visible');
    });
  
    it('should display breed cards', () => {
      cy.wait('@getBreeds');
      cy.get('.breeds-grid').find('.breed-card').should('have.length', 10);
    });
  
    it('should filter breeds by search term', () => {
      cy.get('.search-bar').type('Affenpinscher');
      cy.get('.breeds-grid').find('.breed-card').should('have.length', 1);
      cy.get('.breed-card h2').contains('Affenpinscher');
    });
  
    it('should favorite a breed and check persistence', () => {
        cy.wait('@getBreeds');
        cy.get('.breed-card-container').first().find('.favorite-icon').click();
        cy.get('.breed-card-container').first().find('.favorite-icon.favorite').should('exist');
        cy.reload();
        cy.get('.breed-card-container').first().find('.favorite-icon.favorite').should('exist');
      });  
    
      it('should navigate to breed details page', () => {
        cy.wait('@getBreeds');
        cy.get('.breed-card-container').first().find('a').click();
        cy.url().should('include', '/breed/1');
      });
    });
  