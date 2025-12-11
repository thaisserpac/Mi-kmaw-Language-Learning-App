describe('Tests the dictionairy module of the Pictionairy game', { scrollBehavior: 'center' }, () => {
    
    // 1. words
    const dictionaryTerms = [
        { alt: "ni'n",      text: "(I)" },
        { alt: "ki'l",      text: "(you)" },
        { alt: "teluisi",   text: "My name is" },
        { alt: "aqq",       text: "and" },
        { alt: "mijisi",    text: "eat" },
        { alt: "wiktm",     text: "taste of it" },
        { alt: "kesalk",    text: "I love" },
        { alt: "l'tu",      text: "Make" },
        { alt: "eliey",     text: "(I am going.)" },
        { alt: "nemitu",    text: "I see it" },
        { alt: "kesatm",    text: "I like" },
        { alt: "wejiey",    text: "I am coming from" },
        { alt: "ta'ta",     text: "Dad" },
        { alt: "kiju'",     text: "Mother" },
        { alt: "nekm",      text: "Him or Her" },
        { alt: "ala'tu",    text: "I have it" },
        { alt: "ula",       text: "Look at this" },
        { alt: "kesalul",   text: "I love you" },
        { alt: "welta'si",  text: "I am happy" },
        { alt: "wen",       text: "Who" }
    ];

    beforeEach(() => {
        cy.visit('http://localhost:3421/Mi-kmaq-Language-Learning-App');
    });

    it('Tests Pictionary (English + French)', () => {
        // Navigation
        cy.contains('Play').click({ force: true });
        cy.get('div.cursor-pointer').first().click();
        cy.contains('English').click();
        cy.get('img[alt="Dictionary"]').first().click();

        // Loop 1: Check all items open (Visible)
        dictionaryTerms.forEach((term) => {
            // Use the alt text from the data array
            cy.get(`img[alt="${term.alt}"]`).first().click({ force: true });
            // Check the visible text
            cy.contains(term.text).scrollIntoView().should('be.visible');
        });

        // Loop 2: Check all items close (Not Visible)
        dictionaryTerms.forEach((term) => {
            // Click again to close/flip back
            cy.get(`img[alt="${term.alt}"]`).first().click({ force: true });
            // Ensure text is hidden
            cy.contains(term.text).should('not.be.visible');
        });
    });
});