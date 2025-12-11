describe('Language Switch Tests', () => {

    beforeEach(() => {
        // Visit your homepage
        cy.visit('http://localhost:3421/Mi-kmaq-Language-Learning-App')
    });

    it('Tests Pictionary (English + French)', () => {
        // Click Start Game button
        cy.contains('Play').click({ force: true })

        // Click the Pictionary button (first div)
        cy.get('div.cursor-pointer').first().click();

        // Make sure language options appear
        cy.contains('English').should('exist');
        cy.contains('French').should('exist');

        // --- Test English version ---
        cy.contains('English').click();

        // Assert UI changed to English
        cy.contains('pictionary').should('exist');

        // Go back so we can test French
        cy.contains('French').click();

        // Assert UI changed to French
        cy.contains('imagier').should('exist');
    });

    it('Tests Goat Island app (English + French)', () => {
        // Click Start Game button
        cy.contains('Play').click({ force: true })

        // Click Goat Island button (second div)
        cy.get('div.cursor-pointer').eq(1).click();

        // Check that language choices appear
        cy.contains('English').should('exist');
        cy.contains('French').should('exist');

        // --- Test English version ---
        cy.contains('English').click();

        // Assert English text appears
        cy.contains('How to Play').should('exist');

        // --- Test French version ---
        cy.contains('French').click();

        // Assert French text appears
        cy.contains('Comment Jouer').should('exist');
    });

});
