import template from "./template.js";
import DB from "../../db.js";

export default class UserItem extends HTMLElement {
  constructor(ownerId, host = "") {
    super();
    this.owner = DB.getUserFromID(ownerId);
    this.host = host;
  }
  connectedCallback() {
    this.innerHTML = template.render({
      avatar: this.owner.avatar,
      name: this.owner.name,
      hi: this.owner.hi,
      host: this.host,
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
    });
  }
}

if (!customElements.get("user-item")) {
  customElements.define("user-item", UserItem);
}
