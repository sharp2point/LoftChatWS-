import WS from "../../ws/ws.js";
import template from "./template.js";

export default class Chat extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = template.render();
    this.dom = template.map(this);
    this.usersBlock = this.dom.usersBlock;
    this.auth = this.dom.auth;
    this.auth.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const value = e.path[1][0].value.trim();
        if (value.length >= 3) {
          WS(value);
          this.auth.classList.add("hide");
          this.usersBlock.classList.remove("hide");
        }
      }
    });
  }
}

if (!customElements.get("loft-chat")) {
  customElements.define("loft-chat", Chat);
}
