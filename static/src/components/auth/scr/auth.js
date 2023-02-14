import template from "./template/template.js";

export class Auth extends HTMLElement {
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

if (!customElements.get("loftchat-auth")) {
  customElements.define("loftchat-auth", Auth);
}
