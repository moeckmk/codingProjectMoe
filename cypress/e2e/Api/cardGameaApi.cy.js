describe('Card Game API Test', () => {

  it('Blackjack Card Game API', () => {

      let deckId;
      let player1Hand;
      let player2Hand;

  const calculateHandValue = (hand) => {
    let value = 0;
    hand.forEach(card => {
      if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
        value += 10;
      } else if (card.value === 'ACE') {
        value += 11;
      } else {
        value += parseInt(card.value);
      }
    });
    return value;
  };

  cy.request('https://deckofcardsapi.com/api/deck/new/').then((response) => {
    expect(response.status).to.eq(200);
    const deckData = response.body;
    deckId = deckData.deck_id;
    expect(deckData.success).to.be.true;
    expect(deckData.deck_id).to.be.a('string');
    expect(deckData.remaining).to.eq(52);

    cy.request(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`).then((response) => {
      expect(response.status).to.eq(200);
      const shuffleData = response.body;
      expect(shuffleData.success).to.be.true;
      expect(shuffleData.deck_id).to.eq(deckId);
      expect(shuffleData.shuffled).to.be.true;
      expect(shuffleData.remaining).to.eq(52);

      cy.request(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`).then((response) => {
        expect(response.status).to.eq(200);
        const drawnCards1 = response.body.cards;
        player1Hand = drawnCards1; // Storing the drawn cards for Player 1
        expect(player1Hand).to.have.length(3);

        // Logs the cards received by Player 1
        cy.log('Player 1 received the following cards:');
        player1Hand.forEach(card => {
          cy.log(`- ${card.value} of ${card.suit}`);
        });

        cy.request(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`).then((response) => {
          expect(response.status).to.eq(200);
          const drawnCards2 = response.body.cards;
          player2Hand = drawnCards2; // Storing the drawn cards for Player 2
          expect(player2Hand).to.have.length(3);

          // Logs the cards received by Player 2
          cy.log('Player 2 received the following cards:');
          player2Hand.forEach(card => {
            cy.log(`- ${card.value} of ${card.suit}`);
          });

    const player1Value = calculateHandValue(player1Hand);
    const player2Value = calculateHandValue(player2Hand);


      if (player1Value === 21 && player2Value === 21) {
  cy.log('Both players have blackjack!');
    } else if (player1Value === 21) {
  cy.log('Player 1 has blackjack!');
    } else if (player2Value === 21) {
  cy.log('Player 2 has blackjack!');
    } else {
  cy.log('Neither player has blackjack.');
    }
        });
      });
    });
  });

  });
});
