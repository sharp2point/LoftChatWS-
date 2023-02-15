import WS from "../../ws.js";
import DB from "../../db.js";
import template from "./template.js";

export default class Chat extends HTMLElement {
  constructor() {
    super();
    this.ws = new WS("ws://localhost:8000");
    this.owner = "";
  }
  connectedCallback() {
    this.innerHTML = template.render();
    this.dom = template.map(this);
    this.ownerPlace = this.dom.owner;
    this.usersBlock = this.dom.usersBlock;
    this.#autorizeUser(this.dom.auth);
  }
  #setOwnerUser(place, props) {
    const { avatar, name, hello } = props;
    this.owner = name;
    place.innerHTML = `<user-item avatar="${avatar}" name="${name}" hello="${hello}"/>`;
  }
  #autorizeUser(component) {
    component.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const ownerName = e.path[1][0].value.trim();
        if (ownerName.length >= 3) {
          const sock = this.ws.init(ownerName);
          sock.onmessage = (message) => {
            const data = JSON.parse(message.data);
            switch (data.type) {
              case "config:id": {
                DB.setOwnerID(data.data.split(":")[0]);
                break;
              }
              case "config:users": {
                DB.setUsers(data.data);
                break;
              }
            }
            this.#updateUsers(this.usersBlock);
          };
          component.classList.add("hide");
          this.#setOwnerUser(this.ownerPlace, {
            avatar: "",
            name: ownerName,
            hello: "Hi all !",
          });
        }
      }
    });
  }
  #updateUsers(place) {
    place.innerHTML = "";
    DB.getUsers()
      .filter((user) => user.split(":")[1] !== DB.getOwnerID())
      .forEach((user) => {
        place.innerHTML += `<user-item avatar="" name="${
          user.split(":")[0]
        }" hello="hi all !"/>`;
      });
  }
}

if (!customElements.get("loft-chat")) {
  customElements.define("loft-chat", Chat);
}
