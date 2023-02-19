import DB from "../../db.js";

import template from "./template.js";

export default class MessageChat extends HTMLElement {
  constructor(data) {
    super();
    this.data = data;
  }
  connectedCallback() {
    this.innerHTML = template.render();
    this.dom = template.map(this);
    this.dom.avatar.src = this.data.avatar || `./img/default.png`;
    this.dom.name.innerHTML = this.data.name;
    this.dom.text.innerHTML = this.data.text;
    this.dom.time.innerHTML = this.data.time;
  }
  update() {
    const owner = DB.getUserFromID(this.data.ownerId);
    this.dom.avatar.src = owner.avatar || `./img/default.png`;
  }
}

if (!customElements.get("message-chat")) {
  customElements.define("message-chat", MessageChat);
}
