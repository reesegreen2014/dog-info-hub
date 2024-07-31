describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });
  
    it('should display the homepage title', () => {
        cy.get('.home-page-header').contains('Dog Info Hub');
    });
  
    it('should display navigation links', () => {
        cy.get('.nav > [href="/"]').contains('Home');
        cy.get('.nav > [href="/all-breeds"]').contains('All Breeds');
        cy.get('.myfavorites').contains('My Favorites');
        cy.get('.resources').contains('Owner Resources')
    })

    it('should application description section', () => {
        cy.get('.info-box').should('exist');
    })

    it('should navigate to the All Breeds page', () => {
        cy.get('.nav > [href="/all-breeds"]').click();
        cy.url().should('include', '/all-breeds')
    })

    it('should navigate to my favorites page', () => {
        cy.get('.myfavorites').click();
        cy.url().should('include', '/favorites')
    })

    it('should navigate to owners resource page', () => {
        cy.get('.resources').click();
        cy.url().should('include', '/resources')
    })
  });
  