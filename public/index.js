import { registerApp } from "./app/App.js";
import { registerCardStackComponent } from "./components/card-stack/card-stack.js";
import { registerFoundationPileComponent } from "./components/card-stack/foundation-pile.js";
import { registerStockpileComponent } from "./components/card-stack/stockpile.js";
import { registerTableauColumnComponent } from "./components/card-stack/tableau-column.js";
import { registerCardComponent } from "./components/card/card.js";

const app = () => {
  registerCardStackComponent();
  registerStockpileComponent();
  registerFoundationPileComponent();
  registerTableauColumnComponent();
  registerCardComponent();
  registerApp();

  const template = document.querySelector("template#root");
  if (template) document.body.appendChild(template.content, true);
};

document.addEventListener("DOMContentLoaded", app);
