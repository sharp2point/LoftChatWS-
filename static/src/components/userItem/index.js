import template from "./template.js";

export default class UserItem extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = template.render({
      avatar: this.getAttribute("avatar"),
      name: this.getAttribute("name"),
      hello: this.getAttribute("hello"),
    });
  }
}

if (!customElements.get("user-item")) {
  customElements.define("user-item", UserItem);
}
