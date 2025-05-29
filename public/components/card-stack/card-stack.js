class CardStack extends HTMLElement {
  static observedAttributes = ["overlap"];

  constructor() {
    super();
  }

  updateCardOffsets() {
    Array.from(this.children).forEach((card, i) => {
      card.style.setProperty("--i", i);
    });
  }

  connectedCallback() {
    this.addEventListener("dragover", (event) => {
      event.preventDefault(); // Allow drop
      event.dataTransfer.dropEffect = "move";
    });

    this.addEventListener("drop", (event) => {
      event.preventDefault();

      const cardId = event.dataTransfer.getData("text/plain");

      if (!cardId) {
        console.warn("No card ID received in drop.");
        return;
      }

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
    });

    console.log("Card deck added to page.");
    this.updateCardOffsets();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attributeChangedCallback", name, oldValue, newValue);
  }
}

export const registerCardStackComponent = () =>
  customElements.define("x-card-stack", CardStack);
