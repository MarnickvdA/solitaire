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
    super.onDragOver(event)
  }

  /**
   * calls when a card is dropped in this stack
   * @param {DragEvent} event
   */
  onDropCard(event) {
    console.warn('cannot drop back to the deck.')
  }
}

export const registerDeckStackComponent = () =>
  customElements.define("x-deck-stack", DeckStack);
