import template from "./template.js";

export default class Post extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = template.render();
  }
}

if (!customElements.get("chat-post")) {
  customElements.define("chat-post", Post);
}
