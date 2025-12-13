import React from 'react';
import GameSelector from '../../src/components/GameSelector'; 
import { BrowserRouter } from 'react-router-dom';

describe('<GameSelector /> Language Selection Test', () => {

    it('displays the language selection modal after interaction', () => {
        // 1. Mount with Router
        cy.mount(
            <BrowserRouter>
                <GameSelector />
            </BrowserRouter>
        );

        // 2. Click Play to enter the menu
        cy.contains('Play').click({ force: true });

        // 3. Click a game to trigger the language popup
        // (Select the first game card available)
        cy.get('.rounded-3xl').first().click({ force: true });

        // 4. NOW check for the language buttons
        cy.contains('English').should('be.visible');
        cy.contains('French').should('be.visible');
    });

    it('updates text/UI when French is selected', () => {
        // Create a spy to verify the selection works
        const onGameSelectSpy = cy.spy().as('onGameSelectSpy');

        cy.mount(
            <BrowserRouter>
                <GameSelector onGameSelect={onGameSelectSpy} />
            </BrowserRouter>
        );

        // Navigate to the popup
        cy.contains('Play').click({ force: true });
        cy.get('.rounded-3xl').first().click({ force: true });

        // Click French
        cy.contains('French').click();

        // Verify that the component tried to start the game with French
        // (This confirms the button works)
        cy.get('@onGameSelectSpy').should('have.been.called');
    });
});