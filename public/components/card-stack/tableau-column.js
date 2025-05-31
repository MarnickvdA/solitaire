import { CardStack } from "./card-stack.js";
import { ranks } from "../../lib/deck-utils.js";

class TableauColumn extends CardStack {
  canDropCard(target, event) {
    if (!super.canDropCard(target, event)) return false;

    const data = event.dataTransfer.getData("text/plain");
    const { cardId } = JSON.parse(data);

    const card = document.getElementById(cardId);
    const rank = card.getAttribute("rank");
    const suit = card.getAttribute("suit");

    // only king can be put in empty column
    if (this.children.length === 0 && rank === "King") {
      return true;
    }

    // check if the current card can be placed on the previous card
    const topCard = target.lastElementChild;
    const topCardSuit = topCard.getAttribute("suit");
    const topCardRank = topCard.getAttribute("rank");

    if (
      !(
        (["Hearts", "Diamonds"].includes(suit) &&
          ["Clubs", "Spades"].includes(topCardSuit)) ||
        (["Hearts", "Diamonds"].includes(topCardSuit) &&
          ["Clubs", "Spades"].includes(suit))
      )
    ) {
      console.warn(`Expected different color of suit, got: ${suit}`);
      return false;
    }

    if (ranks.indexOf(rank) !== ranks.indexOf(topCardRank) - 1) {
      console.warn(
        `Expected rank ${ranks[ranks.indexOf(topCardRank) - 1]}, got: ${rank}`,
      );
      return false;
    }

    return true;
  }
}

export const registerTableauColumnComponent = () =>
  customElements.define("x-tableau-column", TableauColumn);
