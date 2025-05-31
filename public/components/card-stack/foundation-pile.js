import { CardStack } from "./card-stack.js";
import { ranks } from "../../lib/deck-utils.js";

class FoundationPile extends CardStack {
  static observedAttributes = ["overlap", "suit"];

  canDropCard(target, event) {
    const data = event.dataTransfer.getData("text/plain");
    const { cardId } = JSON.parse(data);

    const card = document.getElementById(cardId);
    const rank = card.getAttribute("rank");
    const suit = card.getAttribute("suit");
    const pileSuite = this.getAttribute("suit");

    if (!this.hasChildNodes()) {
      if (rank !== "Ace") {
        console.warn("First element of ace deck must be an ace!");
        return false;
      }

      if (suit !== pileSuite) {
        console.warn(`Must be Ace of ${pileSuite}, got Ace of ${suit}`);
        return false;
      }

      return true;
    }

    // check if the current card can be placed on the previous card
    const topCard = target.lastElementChild;
    const topCardSuit = topCard.getAttribute("suit");
    const topCardRank = topCard.getAttribute("rank");

    if (suit !== topCardSuit) {
      console.warn(`Expected ${topCardSuit} suit, got: ${suit}`);
      return false;
    }

    if (ranks.indexOf(rank) !== ranks.indexOf(topCardRank) + 1) {
      console.warn(
        `Expected rank ${ranks[ranks.indexOf(topCardRank) + 1]}, got: ${rank}`,
      );
      return false;
    }

    return true;
  }
}

export const registerFoundationPileComponent = () =>
  customElements.define("x-foundation-pile", FoundationPile);
