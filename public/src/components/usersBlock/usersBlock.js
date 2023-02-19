import template from "./template.js";

export default class UsersBlock extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = template.render();
  }
  clear() {
    while (this.firstChild) {
      this.removeChild(this.lastChild);
    }
  }
}

if (!customElements.get("users-block")) {
  customElements.define("users-block", UsersBlock);
}
