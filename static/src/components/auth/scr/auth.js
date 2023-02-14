import template from "./template/template.js";

export class Auth extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = template.render();
    this.dom = template.map(this);

    const form = this.dom.form;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    const submit = this.dom.submit;
    submit.addEventListener("click", (e) => {
      console.log("NIK:", form.elements.nik.value);
    });
  }
}

if (!customElements.get("loftchat-auth")) {
  customElements.define("loftchat-auth", Auth);
}
