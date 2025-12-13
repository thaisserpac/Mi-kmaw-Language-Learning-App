import React from 'react'
import GameSelector from '../../src/components/GameSelector';
import { BrowserRouter } from 'react-router-dom'; // <--- 1. Import this

describe('GameSelector Component Test', () => {
  
  it('should show game selection after clicking Play', () => {
    const onGameSelectSpy = cy.spy().as('onGameSelectSpy');

    // 2. Wrap the component in BrowserRouter
    cy.mount(
      <BrowserRouter>
        <GameSelector onGameSelect={onGameSelectSpy} />
      </BrowserRouter>
    );

    // Click the Play button
    cy.get('[data-cy="Play"]').click({ force: true });

    // Verify both games are now visible
    cy.get('[data-cy="select-goat-island"]').should('be.visible');
    // Note: If using .first(), ensure it targets the specific game card
    cy.get('.rounded-3xl').should('have.length.at.least', 1); 
  });

  it('should display language options and call callback with correct parameters', () => {
    const onGameSelectSpy = cy.spy().as('onGameSelectSpy');
  
    cy.mount(
      <BrowserRouter>
        <GameSelector onGameSelect={onGameSelectSpy} />
      </BrowserRouter>
    );
    
    // Navigate to game selection screen
    cy.get('[data-cy="Play"]').click({ force: true });
    
    // Click on Goat Island game 
    cy.get('[data-cy="select-goat-island"]').click();
    
    // Verify language selection popup appears
    cy.contains('Choose Language').should('be.visible');
    
    // Select English language
    cy.get('button[data-cy="goat-island"]').click();
    
    cy.get('@onGameSelectSpy').should('have.been.calledWith', 'goatIsland', 'english');
  });

  it('should handle Translation game selection with French language', () => {
    const onGameSelectSpy = cy.spy().as('onGameSelectSpy');
    
    cy.mount(
      <BrowserRouter>
        <GameSelector onGameSelect={onGameSelectSpy} />
      </BrowserRouter>
    );
    
    // Navigate to game selection
    cy.get('[data-cy="Play"]').click({ force: true });
    
    // Click the translation game (Pictionary)
    // Adjust selector to be more specific if .rounded-3xl grabs the container
    cy.get('.rounded-3xl').first().click();
    
    // Verify language popup appears
    cy.contains('Choose Language').should('be.visible');
    
    // Select French
    cy.contains('button', 'French').click();
    
    // Verify callback
    cy.get('@onGameSelectSpy').should('have.been.calledWith', 'translation', 'french');
  });
});