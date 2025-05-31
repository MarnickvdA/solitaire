import { CardStack } from "./card-stack.js";

class StockPile extends CardStack {
  canDropCard() {
    console.warn("cannot drop back to the deck.");
    return false;
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("click", () => {
      if (this.children.length === 0) {
        const pile = document.getElementById(`pile`);

        while (pile.children.length !== 0) {
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

export const registerStockpileComponent = () =>
  customElements.define("x-stockpile", StockPile);
