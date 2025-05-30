import { suits, ranks, generateShuffledDeck } from "../lib/deck-utils.js";

class App extends HTMLElement {
  constructor() {
    super();

    this.canDropCard = this.canDropCard.bind(this);

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

    document.getElementById("retry-pile").addEventListener("click", () => {
      const deck = document.getElementById(`deck`);
      const pile = document.getElementById(`pile`);

      while (pile.hasChildNodes()) {
        deck.appendChild(pile.lastChild);
      }
    });
  }

  /**
   * @param {HTMLElement} target drop target
   * @param {DragEvent} event
   * @returns {boolean} can drop card
   */
  canDropCard(target, event) {
    const data = event.dataTransfer.getData("text/plain");

    if (!data) {
      console.warn("No data received.");
      return false;
    }

    const { cardId, sourceId } = JSON.parse(data);

    if (!cardId) {
      console.warn("No card ID received in drop.");
      return false;
    }

    if (target.id === "pile") {
      if (sourceId !== "deck") {
        console.warn("can only drop in pile from deck");
        return false;
      }

      // we can skip the rest because we move card from deck to pile
      return true;
    }

    const card = document.getElementById(cardId);
    const rank = card.getAttribute("rank");
    const suit = card.getAttribute("suit");

    // Check for first ace in the ace decks
    if (
      suits.map((v) => v.toLowerCase()).includes(target.id) &&
      target.children.length === 0
    ) {
      if (rank !== "Ace") {
        console.warn("First element of ace deck must be an ace!");
        return false;
      }

      if (target.id !== suit.toLowerCase()) {
        console.warn(`Must be Ace of ${target.id}, got Ace of ${suit}`);
        return false;
      }
    }

    // for any non-ace stack, if the stack is empty, we can just drop the card.
    if (target.children.length === 0) {
      return true;
    }

    // check if the current card can be placed on the previous card
    const topCard = target.lastElementChild;
    const topCardSuit = topCard.getAttribute("suit");
    const topCardRank = topCard.getAttribute("rank");

    if (suit !== topCardSuit) {
      console.warn(`Expected suit ${topCardSuit}, got: ${suit}`);
      return false;
    }

    if (ranks.indexOf(rank) - 1 !== ranks.indexOf(topCardRank)) {
      console.warn(
        `Expected rank ${ranks[ranks.indexOf(topCardRank) + 1]}, got: ${rank}`,
      );
      return false;
    }

    return true;
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="deck-container">
          <span id="retry-pile" class="bg-text">&circlearrowright;</span>
          <x-deck-stack id="deck" style="grid-area: SD;"></x-deck-stack>
        </div>

        <x-card-stack id="pile" style="grid-area: SP;"></x-card-stack>

        <div class="deck-container" style="grid-area: AH;">
          <x-card-stack id="hearts" overlap></x-card-stack>
          <span class="bg-text">&#9829;</span>
        </div>

        <div class="deck-container" style="grid-area: AC;">
          <x-card-stack id="clubs" overlap></x-card-stack>
          <span class="bg-text">&#9827;</span>
        </div>

        <div class="deck-container" style="grid-area: AD;">
          <x-card-stack id="diamonds" overlap></x-card-stack>
          <span class="bg-text">&#9830;</span>
        </div>

        <div class="deck-container" style="grid-area: AS;">
          <x-card-stack id="spades" overlap></x-card-stack>
          <span class="bg-text">&#9824;</span>
        </div>

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
