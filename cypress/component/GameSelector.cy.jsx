import GameSelector from '../../src/components/GameSelector';

describe('GameSelector Component Test', () => {
  
  it('should show game selection after clicking Play', () => {
    const onGameSelectSpy = cy.spy().as('onGameSelectSpy');

    cy.mount(<GameSelector onGameSelect={onGameSelectSpy} />);

    // Click the Play button
    cy.get('[data-cy="Play"]').click({ force: true });

    // Verify both games are now visible
    cy.get('[data-cy="select-goat-island"]').should('be.visible');
    cy.get('.rounded-3xl').first().should('be.visible'); 
  });

  it('should display language options and call callback with correct parameters', () => {
    const onGameSelectSpy = cy.spy().as('onGameSelectSpy');
  
    cy.mount(<GameSelector onGameSelect={onGameSelectSpy} />);
    
    // Navigate to game selection screen
    cy.get('[data-cy="Play"]').click({ force: true });
    
    // Click on Goat Island game 
    cy.get('[data-cy="select-goat-island"]').click();
    
    // Verify language selection popup appears
    cy.contains('Choose Language').should('be.visible');
    
    // Select English language
    cy.get('button[data-cy="goat-island"]').click();
    
    // Verify the callback was called with correct game and language
    cy.get('@onGameSelectSpy').should('have.been.calledWith', 'goatIsland', 'english');
  });

  it('should handle Translation game selection with French language', () => {
    const onGameSelectSpy = cy.spy().as('onGameSelectSpy');
    cy.mount(<GameSelector onGameSelect={onGameSelectSpy} />);
    
    // Navigate to game selection
    cy.get('[data-cy="Play"]').click({ force: true });
    
    // Click the translation game
    cy.get('.rounded-3xl').first().click();
    
    // Verify language popup appears
    cy.contains('Choose Language').should('be.visible');
    
    // Select French
    cy.contains('button', 'French').click();
    
    // Verify callback was called with translation game and French language
    cy.get('@onGameSelectSpy').should('have.been.calledWith', 'translation', 'french');
  });
});