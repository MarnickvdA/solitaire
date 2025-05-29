export class CardStack extends HTMLElement {
  static observedAttributes = ["overlap"];

  constructor() {
    super();
  }

  updateCardOffsets() {
    Array.from(this.children).forEach((card, i) => {
      card.style.setProperty("--i", i);
    });
  }

  /**
   * calls when a card is dragged over this stack
   * @param {DragEvent} event
   */
  onDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  /**
   * calls when a card is dropped in this stack
   * @param {DragEvent} event
   */
  onDropCard(event) {
    const app = document.querySelector("x-app");
    if (!app || typeof app.canDropCard !== "function") {
      return;
    }

    if (!app.canDropCard(this, event)) {
      console.warn("Cannot drop card in this stack");
      return;
    }

    event.preventDefault();

    const data = event.dataTransfer.getData("text/plain");
    const { cardId } = JSON.parse(data);
    const card = document.getElementById(cardId);
    if (!card) {
      console.warn(`No element found with ID "${cardId}"`);
      return;
    }

    if (card.parentElement !== this) {
      const parent = card.parentElement;

      // remove card from old stack
      card.remove();

      // Open the card under the card that was removed
      if (parent.lastElementChild) {
        parent.lastElementChild.setAttribute("open", true);
      }
    }

    this.appendChild(card);
    this.updateCardOffsets();
  }

  connectedCallback() {
    this.addEventListener("dragover", this.onDragOver);
    this.addEventListener("drop", this.onDropCard);

    this.updateCardOffsets();
  }
}

export const registerCardStackComponent = () =>
  customElements.define("x-card-stack", CardStack);
