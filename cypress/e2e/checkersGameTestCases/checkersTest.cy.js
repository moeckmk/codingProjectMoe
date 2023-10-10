//The Checkers Game

describe('Checkers Game', () => {

  beforeEach(() => {
    // Navigating to the website
    cy.visit('https://www.gamesforthebrain.com/game/checkers/', { timeout: 20000 });
  });


  it('Navigating to Checkers Game', () => {
    // Confirming that the site is up
    cy.title().should('contain', 'Checkers');
  });


  it('Making Moves in Checkers Game', () => {

    cy.get('#message').should("contain", "Select an orange piece to move.");

    // Defining the moves
    const moves = [
      { start: 62, end: 53 },
      { start: 53, end: 44 },
      { start: 42, end: 64 },
      { start: 51, end: 42 },
      { start: 40, end: 51 },
    ];

    // Functioning to make a move
    const makeMoveFunction = (start, end) => {
      cy.get(`[name="space${start}"]`).click();
      cy.get(`[name="space${end}"]`).click();
      cy.wait(2000); // Wait for the blue player to move
      cy.contains('Make a move').should('be.visible'); // Confirmation that the player can take the next step
    };

    // Looping through the moves
    for (const move of moves) {
      makeMoveFunction(move.start, move.end);
    }

    //Restarting the game after five moves
    cy.contains('Restart').click();

    //Confirming that the restarting had been successful
    cy.get('#message').should("exist");
    cy.get('#message').should("contain", "Select an orange piece to move.");
  });
});