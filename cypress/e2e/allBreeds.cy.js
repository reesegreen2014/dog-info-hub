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

    it('should apply correct filters', () => {
        cy.get('.filter-button').click();
        cy.get('.breed-groups > :nth-child(4)').click();
        cy.get('.breed-groups > :nth-child(2)').click();
        cy.get('.size-options > :nth-child(3) > input').click();
        cy.get('.apply-filters-button').click();
        cy.get('.breeds-grid').find('.breed-card').should('have.length', 5)
    })

    it('should apply correct filters and clear filters', () => {
        cy.get('.filter-button').click();
        cy.get('.breed-groups > :nth-child(4)').click();
        cy.get('.breed-groups > :nth-child(2)').click();
        cy.get('.size-options > :nth-child(3) > input').click();
        cy.get('.apply-filters-button').click();
        cy.get('.filter-button').click();
        cy.get('.reset-filters-button').click();
        cy.get('.close-button').click();
        cy.get('.breeds-grid').find('.breed-card').should('have.length', 10)
    })
  
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

      it('should display error message on failed API call', () => {
        cy.intercept('GET', '**/breeds', { statusCode: 500 }).as('getBreedsError');
        cy.visit('http://localhost:3000/all-breeds');
        cy.wait('@getBreedsError');
        cy.get('.error-message').should('be.visible').and('contain', 'No breeds found. Please try again later.');
      });
    });
  