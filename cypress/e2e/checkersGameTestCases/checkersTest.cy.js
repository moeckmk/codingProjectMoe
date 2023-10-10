//The Checkers Game

describe('Checkers Game', () => {
  it('Playing checkers game', () => {
    // Navigating to the website
    cy.visit('https://www.gamesforthebrain.com/game/checkers/', { timeout: 20000 });

    cy.wait(10000)
    // Confirming that the site is up
    cy.title().should('contain', 'Checkers');

    // Step 3: Make five legal moves as orange
    for (let i = 0; i < 5; i++) {

        cy.get('[name="space62"]').then(($piece) => {
        const startPosition = $piece.attr('id');
        const targetPosition = '#' + (parseInt(startPosition) + 7); // Move one row down

        cy.get(targetPosition).click();
        cy.contains('Make a move').click();
      });
    }

    // Step 4: Include taking a blue piece (assuming it's a legal move)
    cy.get('.blue').first().click();
    cy.contains('Make a move').click();

    // Step 5: Restart the game after five moves
    cy.contains('Restart').click();

    // Step 6: Confirm that the restarting had been successful
    cy.get('.orange.active').should('exist');
  });
});