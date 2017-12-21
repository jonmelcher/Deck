const VALUES = [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A' ];
const SUITS = [ 'C', 'S', 'D', 'H' ];


const generateDeck = () => SUITS.reduce((deck, suit) => {
    const completeSuit = VALUES.reduce((acc, value) => acc.concat(`${value}${suit}`), []);
    return deck.concat(completeSuit);
}, []);

module.exports = { generateDeck };
