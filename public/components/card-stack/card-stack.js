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

    return true;
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
    if (!this.canDropCard(this, event)) {
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

      if (
        card.parentElement.id.startsWith("stack") &&
        this.id.startsWith("stack")
      ) {
        let current = card;
        const selected = [];

        while (current) {
          selected.push(current);
          current = current.nextElementSibling;
        }

        for (let i = 0; i < selected.length; i++) {
          selected[i].remove();
          this.appendChild(selected[i]);
        }
      } else {
        card.remove();
        this.appendChild(card);
      }

      // Open the card under the card that was removed
      if (parent.lastElementChild) {
        parent.lastElementChild.setAttribute("open", true);
      }
    }

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
