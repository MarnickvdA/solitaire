import { generateShuffledDeck } from "../lib/deck-utils.js";

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
        <div class="deck-container" style="grid-area: SD;">
          <span id="retry-pile" class="bg-text">&circlearrowright;</span>
          <x-stockpile id="deck" ></x-deck-stack>
        </div>

        <x-card-stack id="pile" style="grid-area: SP;"></x-card-stack>

        <div class="deck-container" style="grid-area: AH;">
          <x-foundation-pile id="hearts" suit="Hearts"></x-foundation-pile>
          <span class="bg-text">&#9829;</span>
        </div>

        <div class="deck-container" style="grid-area: AC;">
          <x-foundation-pile id="clubs" suit="Clubs"></x-foundation-pile>
          <span class="bg-text">&#9827;</span>
        </div>

        <div class="deck-container" style="grid-area: AD;">
          <x-foundation-pile id="diamonds" suit="Diamonds"></x-foundation-pile>
          <span class="bg-text">&#9830;</span>
        </div>

        <div class="deck-container" style="grid-area: AS;">
          <x-foundation-pile id="spades" suit="Spades"></x-foundation-pile>
          <span class="bg-text">&#9824;</span>
        </div>

        <x-tableau-column id="stack1" style="grid-area: S1;"></x-tableau-column>
        <x-tableau-column id="stack2" style="grid-area: S2;"></x-tableau-column>
        <x-tableau-column id="stack3" style="grid-area: S3;"></x-tableau-column>
        <x-tableau-column id="stack4" style="grid-area: S4;"></x-tableau-column>
        <x-tableau-column id="stack5" style="grid-area: S5;"></x-tableau-column>
        <x-tableau-column id="stack6" style="grid-area: S6;"></x-tableau-column>
        <x-tableau-column id="stack7" style="grid-area: S7;"></x-tableau-column>
        `;

    this.init();
  }
}

export const registerApp = () => {
  customElements.define("x-app", App);
};
