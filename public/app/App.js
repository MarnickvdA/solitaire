/**
 * @typedef {({ suit: string; rank: string; order: number; })} Card
 */

/**
 * @returns {Card[]} shuffled deck
 */
function generateShuffledDeck() {
  const suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
  const ranks = [
    "Ace",
    "King",
    "Queen",
    "Jack",
    "10",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ];

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

  for (var i = deck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }

  return deck;
}

class App extends HTMLElement {
  constructor() {
    super();

    this.deck = generateShuffledDeck();
  }

  /**
   * @param {HTMLElement} stackElement
   * @param {Card} card
   * @param {boolean} open
   */
  addCardToStack(stackElement, card, open) {
    const cardElement = document.createElement("x-card");
    cardElement.setAttribute("suit", card.suit);
    cardElement.setAttribute("rank", card.rank);
    cardElement.setAttribute("open", open);
    cardElement.style.setProperty("--i", stackElement.children.length);

    stackElement.appendChild(cardElement);
  }

  init() {
    for (let i = 1; i <= 7; i++) {
      const stack = document.getElementById(`stack${i}`);
      for (let c = 0; c < i; c++) {
        const card = this.deck.pop();
        this.addCardToStack(stack, card, c + 1 == i);
      }
    }

    const deckStack = document.getElementById(`deck`);
    while (this.deck.length > 0) {
      const card = this.deck.pop();
      this.addCardToStack(deckStack, card, this.deck.length == 0);
    }
  }

  connectedCallback() {
    this.innerHTML = `
        <x-card-stack id="deck" style="grid-area: SD;"></x-card-stack>
        <x-card-stack id="pile" style="grid-area: SP;"></x-card-stack>

        <x-card-stack id="hearts" overlap style="grid-area: AH;"></x-card-stack>
        <x-card-stack id="clubs" overlap style="grid-area: AC;"></x-card-stack>
        <x-card-stack id="diamonds" overlap style="grid-area: AD;"></x-card-stack>
        <x-card-stack id="spades" overlap style="grid-area: AS;"></x-card-stack>

        <x-card-stack id="stack1" overlap style="grid-area: S1;"></x-card-stack>
        <x-card-stack id="stack2" overlap style="grid-area: S2;"></x-card-stack>
        <x-card-stack id="stack3" overlap style="grid-area: S3;"></x-card-stack>
        <x-card-stack id="stack4" overlap style="grid-area: S4;"></x-card-stack>
        <x-card-stack id="stack5" overlap style="grid-area: S5;"></x-card-stack>
        <x-card-stack id="stack6" overlap style="grid-area: S6;"></x-card-stack>
        <x-card-stack id="stack7" overlap style="grid-area: S7;"></x-card-stack>
        `;

    this.init();
  }
}

export const registerApp = () => {
  customElements.define("x-app", App);
};
