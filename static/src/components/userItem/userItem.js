import template from "./template.js";
import DB from "../../db.js";

export default class UserItem extends HTMLElement {
  constructor(ownerId, host = "", fnc) {
    super();
    this.ownerId = ownerId;
    this.owner = DB.getUserFromID(ownerId);
    this.host = host;
    this.subscribers = [];
  }
  connectedCallback() {
    this.innerHTML = template.render({
      avatar: this.owner.avatar,
      name: this.owner.name,
      hi: this.owner.hi,
      host: this.host,
      ownerId: this.ownerId,
    });
    this.dom = template.map(this);
    if (this.host) {
      this.dom.dialog.style.display = "none";
      this.#changeAvatarDialog();
    }
  }
  #containsClass(e, className) {
    return e.target.classList.contains(className);
  }
  #changeAvatarDialog() {
    this.dom.avatar.addEventListener("click", (e) => {
      this.dom.dialog.style.display = "flex";
      this.dom.dialog.addEventListener(
        "click",
        (e) => {
          if (this.#containsClass(e, "save-button")) {
          } else if (this.#containsClass(e, "item-dialog-avatar")) {
            this.#openFileDialog();
          }
          this.dom.dialog.style.display = "none";
        },
        { once: true }
      );
    });
  }
  #openFileDialog() {
    this.dom.dialogFile.click();

    this.dom.dialogFile.addEventListener("change", (e) => {
      this.dom.dialogForm.submit();
      this.subscribers.forEach((subs) => {
        subs.callback.call(subs.scope, this.ownerId);
      });
    });
  }
  setNewSubscriber(scope, fnc) {
    this.subscribers.push({ scope: scope, callback: fnc });
  }
}

if (!customElements.get("user-item")) {
  customElements.define("user-item", UserItem);
}
