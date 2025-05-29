import { getUnicodeForSuit } from "../../lib/deck-utils.js";

class Card extends HTMLElement {
  static observedAttributes = ["open", "suit", "rank"];

  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute("draggable", "true");

    this.addEventListener("dragstart", (event) => {
      this.id ||= `card-${crypto.randomUUID()}`;
      this.classList.add("hide");
      event.dataTransfer.setData(
        "text/plain",
        JSON.stringify({ cardId: this.id, sourceId: this.parentElement.id }),
      );
      event.dataTransfer.effectAllowed = "move";
    });

    this.addEventListener("dragend", () => {
      this.classList.remove("hide");
    });

    const shortRank =
      this.getAttribute("rank") === "10"
        ? this.getAttribute("rank")
        : this.getAttribute("rank").charAt(0);
    const suitUnicode = getUnicodeForSuit(this.getAttribute("suit"));

    this.innerHTML = `
        <div class="card-content">
          <div class="card-info card-header">
            <span class="card-rank">${shortRank}</span>
            <span class="card-suit">${suitUnicode}</span>
          </div>
          <div class="card-body"></div>
          <div class="card-info card-footer">
            <span class="card-rank">${shortRank}</span>
            <span class="card-suit">${suitUnicode}</span>
          </div>
        </div>
      `;
  }
}

export const registerCardComponent = () =>
  customElements.define("x-card", Card);
