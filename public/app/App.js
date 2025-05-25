class App extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <link rel="stylesheet" href="${import.meta.resolve("./App.css")}">
        <x-card-stack style="grid-area: SD;">
            Deck
            <x-card open="false"></x-card>
            <x-card open="false"></x-card>
            <x-card open="false"></x-card>
        </x-card-stack>
        <x-card-stack style="grid-area: SP;">Pile</x-card-stack>

        <x-card-stack style="grid-area: AH;">Ace Hearts</x-card-stack>
        <x-card-stack style="grid-area: AC;">Ace Clubs</x-card-stack>
        <x-card-stack style="grid-area: AD;">Ace Diamonds</x-card-stack>
        <x-card-stack style="grid-area: AS;">Ace Spades</x-card-stack>

        <x-card-stack style="grid-area: S1;">Stack 1</x-card-stack>
        <x-card-stack style="grid-area: S2;">Stack 2</x-card-stack>
        <x-card-stack style="grid-area: S3;">Stack 3</x-card-stack>
        <x-card-stack style="grid-area: S4;">Stack 4</x-card-stack>
        <x-card-stack style="grid-area: S5;">Stack 5</x-card-stack>
        <x-card-stack style="grid-area: S6;">Stack 6</x-card-stack>
        <x-card-stack style="grid-area: S7;">Stack 7</x-card-stack>
        `;
  }
}

export const registerApp = () => {
  customElements.define("x-app", App);
};
