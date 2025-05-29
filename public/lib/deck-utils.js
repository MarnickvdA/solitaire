/**
 * @typedef {({ suit: string; rank: string; order: number; })} Card
 */

export const suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
export const ranks = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
];

/**
 * @param {string} suit
 */
export function getUnicodeForSuit(suit) {
  switch (suit.toLowerCase()) {
    case "hearts":
      return "&#9829;";
    case "clubs":
      return "&#9827;";
    case "diamonds":
      return "&#9830;";
    case "spades":
      return "&#9824;";
  }
}

/**
 * @returns {Card[]} shuffled deck
 */
export function generateShuffledDeck() {
  let deck = [];
  for (let j = 0; j < suits.length; j++) {
    for (let i = 0; i < ranks.length; i++) {
      deck = [
        ...deck,
        {
          suit: suits[j],
          rank: ranks[i],
          order: i,
        },
      ];
    }
  }

  const shuffle = true;

  if (shuffle) {
    for (var i = deck.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
  }

  return deck;
}
