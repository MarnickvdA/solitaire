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
      event.dataTransfer.setData("text/plain", this.id);
      event.dataTransfer.effectAllowed = "move";
      console.log("Dragging card...");
    });

    this.addEventListener("dragend", () => {
      this.classList.remove("hide");
    })

    console.log("Playing card added to page.");

    this.innerHTML = `
        <p class="card-content">${this.getAttribute("rank")} of ${this.getAttribute("suit")}</p>
      `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attributeChangedCallback", name, oldValue, newValue);
  }
}

export const registerCardComponent = () =>
  customElements.define("x-card", Card);
