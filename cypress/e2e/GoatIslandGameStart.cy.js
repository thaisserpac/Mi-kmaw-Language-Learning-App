describe('Testing game starts, user ansers questions correctly, game pauses after 3 questions', () => {
    beforeEach('Loads website, then navigates to Goat Island Game', () => {
        cy.viewport(1280, 720)
        cy.visit('http://localhost:3421/Mi-kmaq-Language-Learning-App')
        cy.get('[data-cy="Play"]').should('be.visible');
        cy.get('[data-cy="Play"]').click();
        cy.get('[data-cy="select-goat-island"]').should("be.visible");
        cy.get('[data-cy="select-goat-island"]').click();
        cy.get('[data-cy="goat-island"]').should('be.visible');
        cy.get('[data-cy="goat-island"]').click();
        cy.get('[data-cy="Start-Game"]').should('be.visible');
        cy.get('[data-cy="Start-Game"]').click();
    });

    it('should start the game when flag is clicked, and open dictionary', () => {
        cy.get('[data-cy="start-flag"]').should('be.visible');
        cy.get('[data-cy="start-flag"]').click();
        cy.get('[data-cy="dictionary-button"]').click()
    });

    it('should pause after 3 question answered correctly', () => {
        cy.get('[data-cy="start-flag"]').should('be.visible');
        cy.get('[data-cy="start-flag"]').click();
        function answeredOneQuestionCorrectly(counter){
            cy.get('[data-cy^="landmark-"]')
                .not('.cursor-not-allowed')
                .filter(":visible")
                .first()
                .click();
        
            cy.get('[data-cy="answer-correct-option"]', {timeout: 5000})
                .should('be.visible')
                .click();

            if(counter < 3){
                cy.get('[data-cy="correct-continue-btn"]').click({ force: true });
            }
        }

        answeredOneQuestionCorrectly(1);
        answeredOneQuestionCorrectly(2);
        answeredOneQuestionCorrectly(3);
        
        cy.get('[data-cy="animal-fact-modal"]').should('be.visible');
        cy.get('[data-cy^="animal-option-"]')
            .first()
            .click()

        cy.get('[data-cy="animal-fact-detail"]').should('be.visible');

        cy.get('[data-cy="animal-fact-detail"]').within(()=>{
            cy.contains(/fact/i).should('exist');
        });

        cy.get('[data-cy="animal-detail-continue"]').click();
    });
});