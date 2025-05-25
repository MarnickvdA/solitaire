class Card extends HTMLElement {
  static observedAttributes = ["open", "suit", "rank"];

  constructor() {
    super();
  }

  connectedCallback() {
    if (!document.querySelector('link[href*="card.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = new URL("./card.css", import.meta.url);
      document.head.appendChild(link);
    }

    this.setAttribute("draggable", "true");
    this.addEventListener("dragstart", (event) => {
      this.id ||= `card-${crypto.randomUUID()}`;
      event.dataTransfer.setData("text/plain", this.id);
      event.dataTransfer.effectAllowed = "move";
      console.log("Dragging card...");
    });

    console.log("Playing card added to page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attributeChangedCallback", name, oldValue, newValue);
  }
}

export const registerCardComponent = () =>
  customElements.define("x-card", Card);
