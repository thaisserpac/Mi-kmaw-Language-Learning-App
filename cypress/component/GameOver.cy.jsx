import React from 'react';
import GameOver from '../../src/Goat island components/Modals/GameOver';

describe("<GameOver /> Component Test", () => {
    it('it renders the game over screen', () => {
        cy.viewport(1024, 768);
        const resetSpy = cy.stub().as("resetGame");
        cy.mount(
            <GameOver
                isCompleted={true}
                length={9}
                score={9}
                responses={["bear", "fox"]}
                resetGame={resetSpy}/>
        );
        cy.get('[data-cy="gameOver-modal"]').should('be.visible');

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
                resetGame={() => {
                }}
            />
        );

        cy.get('[data-cy="gameOver-message"]').should("contain", "Game Over");

        cy.get('[data-cy="score-display"]').should("contain", "2");
    });
});