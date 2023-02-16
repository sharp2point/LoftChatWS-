import template from "./template.js";

export default class UsersBlock extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = template.render();
  }
}

if (!customElements.get("users-block")) {
  customElements.define("users-block", UsersBlock);
}
