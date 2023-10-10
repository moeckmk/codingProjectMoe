export class CalculateHandleValue {


    calculateHandleValueMethod(hand){
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
        }
}

export default new CalculateHandleValue();