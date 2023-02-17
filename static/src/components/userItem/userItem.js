import template from "./template.js";

export default class UserItem extends HTMLElement {
  constructor(ownerId, avatar, name, hello) {
    super();
    this.ownerId = ownerId;
    this.avatar = avatar;
    this.name = name;
    this.hello = hello;
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
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = () => {
      let files = Array.from(input.files);
      console.log(files);
    };
    input.click();
  }
}

if (!customElements.get("user-item")) {
  customElements.define("user-item", UserItem);
}
