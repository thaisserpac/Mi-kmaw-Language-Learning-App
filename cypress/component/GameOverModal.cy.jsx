import { mount } from "cypress/react";
import GameOverModal from "../../src/components/GridLayout/GameOverModal";

describe("<GameOverModal /> Component Tests", () => {

  it("renders Game Over modal when game ends", () => {
    const onNewGameSpy = cy.stub().as("onNewGame");

    mount(
      <GameOverModal
        isGameEnd={true}
        successCount={5}
        onNewGame={onNewGameSpy}
      />
    );
    cy.contains("kelulktelatekn").should("be.visible");
    cy.contains("si'owa'si?").click();
    cy.get("@onNewGame").should("have.been.calledOnce");
    cy.get("img[alt='Success']").should("have.length", 5);
  });

  it("does not render modal when game not ended", () => {
    mount(
      <GameOverModal
        isGameEnd={false}
        successCount={3}
        onNewGame={() => {}}
      />
    );

    cy.contains("kelulktelatekn").should("not.exist");
    cy.get("img[alt='Success']").should("not.exist");
  });
});
