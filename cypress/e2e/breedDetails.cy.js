describe('Breed details', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/breeds', { fixture: 'dogdata.json' }).as('getBreedDetails');
      cy.visit('http://localhost:3000/all-breeds');
    });
  
    it('should display breed details correctly', () => {
      cy.wait('@getBreedDetails');
      cy.get(':nth-child(2) > .breed-card-link > .breed-card > h2').contains('Afghan Hound');
      cy.get(':nth-child(2) > .breed-card-link > .breed-card').click();
      cy.get('.breed-image').should('exist');
      cy.get('.dog-name').should('contain', 'Afghan Hound');
      cy.get('.dog-info > :nth-child(1)').should('contain', 'Origin')
      cy.get('.dog-info > :nth-child(2)').should('contain', 'The Afghan Hound was originally bred for');
      cy.get('.dog-info > :nth-child(3)').should('contain', 'Breed Group');
      cy.get('.dog-info > :nth-child(4)').should('contain', 'Height & Weight');
      cy.get('.dog-info > :nth-child(5)').should('contain', 'The Afghan Hound lives on average between 10 - 13 years.')
      cy.get('.dog-info > :nth-child(6)').should('contain', 'Unique characteristics')
    });

    it('should gracefully handle errors for missing information', () => {
        cy.get(':nth-child(3) > .breed-card-link > .breed-card').should('contain', 'African Hunting Dog').click();
        cy.get('.dog-info > :nth-child(1)').should('contain', `We're working on getting that information! Check back soon.`)
    });

    it('should navigate back to home appropriately', () => {
        cy.get(':nth-child(4) > .breed-card-link > .breed-card').click();
        cy.url().should('include', '/breed/4');
        cy.get('.button').click();
        cy.url().should('include', 'localhost:3000/')
    })
  });
  