describe('All Breeds Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });
  
    it('should navigate to the owner resources page', () => {
        cy.get('.resources').click();
        cy.url().should('contain', '/resources')
    });

    it('should include articles for owners', () => {
        cy.get('.resources').click();
        cy.get('.resources-grid').should('exist');
        cy.get('.resources-grid > :nth-child(1)').should('contain', 'How to Train Your Dog')
        cy.get('.resources-grid > :nth-child(2)').should('contain', 'How To Read Dog Body Language')
        cy.get('.resources-grid > :nth-child(3)').should('contain', '8 Ways to Stop Animal Abuse')
    })
    });
  