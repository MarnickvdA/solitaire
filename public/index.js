import { registerApp } from "./app/App.js";
import { registerCardStackComponent } from "./components/card-stack/card-stack.js";
import { registerDeckStackComponent } from "./components/card-stack/deck-stack.js";
import { registerCardComponent } from "./components/card/card.js";

const app = () => {
  registerCardStackComponent();
  registerDeckStackComponent();
  registerCardComponent();
  registerApp();

  const template = document.querySelector("template#root");
  if (template) document.body.appendChild(template.content, true);
};

document.addEventListener("DOMContentLoaded", app);
