import template from "./template.js";

export default class Auth extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = template.render();
    this.dom = template.map(this);
    this.form = this.dom.form;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
}

if (!customElements.get("chat-auth")) {
  customElements.define("chat-auth", Auth);
}
