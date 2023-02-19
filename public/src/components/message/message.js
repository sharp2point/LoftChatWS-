import template from "./template.js";

export default class MessageChat extends HTMLElement {
  constructor(data) {
    super();
    this.data = data;
  }
  connectedCallback() {
    this.innerHTML = template.render();
    this.dom = template.map(this);
    this.#init();
  }
  #init() {
    this.dom.avatar.src = this.data.avatar;
    this.dom.name.innerHTML = this.data.name;
    this.dom.text.innerHTML = this.data.text;
    this.dom.time.innerHTML = this.data.time;
  }
}

if (!customElements.get("message-chat")) {
  customElements.define("message-chat", MessageChat);
}
