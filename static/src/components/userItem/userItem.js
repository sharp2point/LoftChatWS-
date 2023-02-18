import template from "./template.js";
import DB from "../../db.js";

export default class UserItem extends HTMLElement {
  constructor(ownerId) {
    super();
    this.ownerId = ownerId;
    this.avatar = "";
    this.name = DB.getUserFromID(ownerId);
    this.hello = "hello";
  }
  connectedCallback() {
    this.innerHTML = template.render({
      avatar: this.avatar,
      name: this.name,
      hello: this.hello,
    });
    this.dom = template.map(this);
    this.dom.dialog.style.display = "none";
    this.dom.avatar.addEventListener("click", (e) => {
      this.dom.dialog.style.display = "flex";
      this.dom.dialog.addEventListener(
        "click",
        (e) => {
          if (this.#containsClass(e, "save-button")) {
            console.log("DIALOG Save", e.target);
          } else if (this.#containsClass(e, "item-dialog-avatar")) {
            this.#openFileDialog();
          }
          this.dom.dialog.style.display = "none";
        },
        { once: true }
      );
    });
  }
  #containsClass(e, className) {
    return e.target.classList.contains(className);
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
