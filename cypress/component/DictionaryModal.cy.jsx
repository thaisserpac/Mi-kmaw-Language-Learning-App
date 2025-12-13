import React from 'react';
import DictionaryModal from '../../src/components/DictionaryModal';

describe("<DictionaryModal /> Component Test", () => {
    
    beforeEach(() => {
        // 1. Force Desktop size so we don't deal with mobile/hidden elements
        cy.viewport(1280, 720);
        
        // 2. Mute Audio to prevent the "NotSupportedError" crash
        cy.window().then((win) => {
            cy.stub(win, 'Audio').callsFake(() => ({
                play: () => Promise.resolve(),
                pause: () => {},
                load: () => {},
                addEventListener: () => {},
                removeEventListener: () => {}
            }));
        });
    });

    it('renders the dictionary grid', () => {
        cy.mount(<DictionaryModal />);
        // Check for a known word to confirm the grid loaded
        cy.contains("ni'n").should('exist'); 
    });

    it('flips the card on click', () => {
        cy.mount(<DictionaryModal />);
        // Force click ensures we hit the card even if animations are running
        cy.contains("ni'n").click({ force: true }); 
        cy.contains("(I)").should('exist');
    });

    it('closes when the red close button is clicked', () => {
        // Create the spy
        const closeModalSpy = cy.stub().as("closeModalSpy");
        
        // Pass the spy using the correct prop name: closeModal
        cy.mount(
            <DictionaryModal 
                closeModal={closeModalSpy}
            />
        );

        // Click the first red close button (there are 2: mobile and desktop)
        cy.get('button[class*="text-red-700"]')
          .first()
          .should('exist')
          .click({ force: true });
        
        // Assert the spy was called
        cy.get('@closeModalSpy').should('have.been.called');
    });
});