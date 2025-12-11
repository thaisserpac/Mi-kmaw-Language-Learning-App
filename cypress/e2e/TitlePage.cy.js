describe('Title Page E2E Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3421/Mi-kmaq-Language-Learning-App');
  });

  it('should navigate from title to game selection', () => {
    // Force click the Play button (works on both mobile and desktop)
    cy.get('button[data-cy="Play"]').click({ force: true });
    
    // Verify game selection screen appears
    cy.get('[data-cy="select-goat-island"]').should('be.visible');
  });

  it('should select Goat Island game and start', () => {
    // Navigate to game selection
    cy.get('button[data-cy="Play"]').click({ force: true });
    
    // Select Goat Island
    cy.get('[data-cy="select-goat-island"]').click();
    cy.contains('Choose Language').should('be.visible');
    
    // Select English and verify game starts
    cy.get('button[data-cy="goat-island"]').click();
    cy.get('[data-cy="select-goat-island"]').should('not.exist');
  });

  it('should select Translation game and start', () => {
    // Navigate to game selection
    cy.get('button[data-cy="Play"]').click({ force: true });
    
    // Select Translation/Pictionary game (first game card)
    cy.contains('Choose Language').should('not.exist'); // Verify popup not showing yet
    cy.get('.rounded-3xl').first().click(); // Click first game card
    
    // Verify language selection popup appears
    cy.contains('Choose Language').should('be.visible');
    
    // Select French and verify game starts
    cy.contains('button', 'French').click();
    cy.contains('Choose Language').should('not.exist');
  });
});