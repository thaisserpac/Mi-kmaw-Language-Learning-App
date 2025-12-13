import React from 'react';
import GameOver from '../../src/Goat island components/Modals/GameOver';

describe("<GameOver /> Component Test", () => {
    
    // 1. Create mock data to satisfy the component's needs
    // This ensures the test passes even if LanguageContent.js is missing keys
    const mockContent = {
        congratulations: "Congratulations",
        gameOver: "Game Over",
        score: "Score",
        tryAgain: "Try Again", // Included just in case the component uses it
        home: "Home"           // Included just in case
    };

    it('renders the game over screen', () => {
        cy.viewport(1024, 768);
        const resetSpy = cy.stub().as("resetGame");
        
        cy.mount(
            <GameOver
                isCompleted={true}
                length={9}
                score={9}
                responses={["bear", "fox"]}
                resetGame={resetSpy}
                // 2. Pass the mock data as the 'content' prop
                content={mockContent} 
            />
        );

        cy.get('[data-cy="gameOver-modal"]').should('be.visible');

        // This assertion will now pass because mockContent.congratulations = "Congratulations"
        cy.get('[data-cy="gameOver-message"]').should('contain', 'Congratulations');

        cy.get('[data-cy="score-display"]').should("contain", "9/9");

        cy.get('[data-cy="reset-btn"]').click();

        cy.get('@resetGame').should('have.been.calledOnce');
    });

    it("shows Game over message when not completed", () => {
        cy.mount(
            <GameOver
                isCompleted={false}
                length={9}
                score={2}
                responses={[]}
                resetGame={() => {}}
                // 2. Pass the mock data here too
                content={mockContent}
            />
        );

        // This assertion will pass because mockContent.gameOver = "Game Over"
        cy.get('[data-cy="gameOver-message"]').should("contain", "Game Over");

        cy.get('[data-cy="score-display"]').should("contain", "2");
    });
});