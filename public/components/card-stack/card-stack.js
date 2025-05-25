class CardStack extends HTMLElement {
  constructor() {
    super();
  }

  updateCardOffsets() {
    Array.from(this.children).forEach((card, i) => {
      card.style.setProperty("--i", i);
    });
  }

  connectedCallback() {
    if (!document.querySelector('link[href*="card-stack.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = new URL("./card-stack.css", import.meta.url);
      document.head.appendChild(link);
    }

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
        card.remove();
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
