import { CardStack } from "./card-stack.js";

class DeckStack extends CardStack {
  constructor() {
    super();
  }

  /**
   * calls when a card is dragged over this stack
   * @param {DragEvent} event
   */
  onDragOver(event) {
    super.onDragOver(event);
  }

  /**
   * calls when a card is dropped in this stack
   * @param {DragEvent} event
   */
  onDropCard(event) {
    console.warn("cannot drop back to the deck.");
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("click", () => {
      if (!this.hasChildNodes()) {
        console.log("moving pile back to deck");
        const pile = document.getElementById(`pile`);

        while (pile.hasChildNodes()) {
          const card = document.getElementById(pile.lastChild.id);
          card.setAttribute("open", pile.children.length === 1);
          card.remove();
          this.appendChild(card);
        }

        this.updateCardOffsets();
      }
    });
  }
}

export const registerDeckStackComponent = () =>
  customElements.define("x-deck-stack", DeckStack);
