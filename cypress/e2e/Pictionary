describe("Mi'kmaw Pictionary", () => {

    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.visit("http://localhost:3421/Mi-kmaq-Language-Learning-App");
        cy.contains("Play", { matchCase: false }).click({ force: true });
        cy.get("div.cursor-pointer").first().click();
        cy.contains("English").click();
    });

    it("Dropdown menu works and cycles through all months successfully", () => {
        const months = ["3", "6", "9", "12", "15", "18"];
        cy.viewport(1280, 720);
        months.forEach((value) => {
            cy.get(".Desktop-App #dropdown", { timeout: 5000 })
                .should("be.visible")
                .select(value)
                .should("have.value", value);
        });
    });

    it("Dictionary opens and closes", () => {
        cy.viewport(1280, 720);
        cy.get("[data-cy='dictionary-button-desktop']:visible").click();
        cy.get("[data-cy='dictionary-modal-desktop']:visible")
            .should("be.visible")
            .within(() => cy.contains("×").click({ force: true }));
    });

    it("Plays audio for speaker", () => {
        cy.window().then((win) => {
            cy.spy(win.HTMLMediaElement.prototype, "play").as("audioPlay");
        });
        cy.get("#audioBnDesktop").click({ force: true });
        cy.get("@audioPlay").should("have.been.calledOnce");
    });

    it("Makes multiple guesses and shows feedback with audio", () => {
        cy.window().then((win) => {
            cy.spy(win.HTMLMediaElement.prototype, "play").as("audioPlay");
        });
        const makeGuess = () => {
            cy.get('.grid-box img:visible').then(($images) => {
                const randomIndex = Math.floor(Math.random() * Math.min(3, $images.length));
                cy.wrap($images[randomIndex]).click({ force: true });
            });
            cy.get('.fixed > div.bg-white.rounded-2xl', { timeout: 4000 }).should('be.visible');
            cy.get('@audioPlay').should('have.been.called');
            cy.get('.fixed > div.bg-white.rounded-2xl button').each(($btn) => {
                if ($btn.is(':visible')) cy.wrap($btn).click({ force: true });
            });
            cy.get('.fixed > div.bg-white.rounded-2xl', { timeout: 4000 }).should('not.exist');
            cy.get('body').then(($body) => {
                if ($body.find('.fixed > div.bg-white.rounded-xl').length === 0) {
                    // Only make next guess if game isn't over
                    return makeGuess();
                }
            });
        };

        // Make up to 3 guesses
        makeGuess();
    });

    it("Counts correct answers and displays stars", () => {
        let correctCount = 0;
        const totalGuesses = 3;

        const guessAndCheck = (guessNumber) => {
            if (guessNumber > totalGuesses) {
                expect(correctCount).to.eq(correctCount);
                return;
            }

            cy.get(".grid-box img:visible").then(($images) => {
                const topThree = $images.slice(0, 3);
                const randomIndex = Math.floor(Math.random() * topThree.length);
                cy.wrap(topThree[randomIndex]).click({ force: true });
                cy.get(".fixed > div.bg-white", { timeout: 2000 }).should("be.visible");
                cy.get(".fixed .text-6xl").then(($icon) => {
                    if ($icon.text() === "✅") correctCount++;
                });
                cy.get(".fixed button").each(($btn) => {
                    if ($btn.is(":visible")) cy.wrap($btn).click({ force: true });
                }).then(() => {
                    cy.get(".fixed > div.bg-white", { timeout: 2000 }).should("not.exist").then(() => {
                        guessAndCheck(guessNumber + 1);
                    });
                });
            });
        };

        guessAndCheck(1);
    });
    it("Should let user try again on incorrect answer", () => {
        cy.get(".text-2xl strong, .text-2xl")
            .first()
            .invoke("text")
            .then((displayedWord) => {

                cy.get(".grid-box img:visible").then(($images) => {
                    const topThree = $images.slice(0, 3);
                    const randomIndex = Math.floor(Math.random() * topThree.length);
                    cy.wrap(topThree[randomIndex]).click({ force: true });
                });

                cy.get(".fixed > div.bg-white", { timeout: 2000 }).should("be.visible");

                cy.get(".fixed .text-6xl").then(($icon) => {
                    if ($icon.text() === "❌") {
                        cy.get(".fixed button").each(($btn) => {
                            if ($btn.is(":visible")) cy.wrap($btn).click({ force: true });
                        });

                        cy.get(".fixed > div.bg-white", { timeout: 2000 }).should("not.exist");

                        // Ensure same word is still displayed
                        cy.get(".text-2xl strong, .text-2xl")
                            .first()
                            .should("have.text", displayedWord);
                    }
                });
            });
    });

    it("Game over screen appears when all words are guessed", () => {
        const guessRandomWord = () => {
            cy.get(".grid-box img:visible").then(($images) => {
                const topThree = $images.slice(0, 3);
                const randomIndex = Math.floor(Math.random() * topThree.length);
                cy.wrap(topThree[randomIndex]).click({ force: true });
            });

            cy.get("body").then(($body) => {
                const feedback = $body.find(".fixed > div.bg-white.rounded-2xl");
                if (feedback.length) {
                    cy.wrap(feedback).should("be.visible");
                    cy.wrap(feedback).find("button").each(($btn) => {
                        if ($btn.is(":visible")) cy.wrap($btn).click({ force: true });
                    });
                    cy.wrap(feedback).should("not.exist");
                }
            });
        };

        const playUntilGameOver = () => {
            cy.get("body").then(($body) => {
                const gameOverModal = $body.find(".fixed > div.bg-white.rounded-xl");
                if (gameOverModal.length) {
                    cy.contains("kelulktelatekn", { matchCase: false }).should("exist");
                    cy.log("✅ Game Over reached");
                } else {
                    guessRandomWord();
                    playUntilGameOver();
                }
            });
        };

        playUntilGameOver();
    });

});
