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

    this.innerHTML = `
        <p class="card-content">${this.getAttribute("rank")} of ${this.getAttribute("suit")}</p>
      `;
  }
}

export const registerCardComponent = () =>
  customElements.define("x-card", Card);
