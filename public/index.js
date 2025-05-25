import { registerApp } from "./app/App.js";
import { registerCardStackComponent } from "./components/card-stack/card-stack.js";
import { registerCardComponent } from "./components/card/card.js";

const app = () => {
  registerCardStackComponent();
  registerCardComponent();
  registerApp();

  const template = document.querySelector("template#root");
  if (template) document.body.appendChild(template.content, true);
};

document.addEventListener("DOMContentLoaded", app);
