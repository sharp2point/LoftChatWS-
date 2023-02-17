import Auth from "../auth/auth.js";
import UsersBlock from "../usersBlock/usersBlock.js";
import UserItem from "../userItem/userItem.js";
import ChatBlock from "../chatBlock/chatBlock.js";

import WS from "../../ws.js";
import DB from "../../db.js";
import template from "./template.js";

export default class Chat extends HTMLElement {
  constructor() {
    super();
    this.owner = "";
  }
  connectedCallback() {
    this.innerHTML = template.render();
    this.dom = template.map(this);
    this.ownerPlace = this.dom.owner;
    this.usersBlock = this.dom.usersBlock;
    this.chatBlock = this.dom.chatBlock;
    this.chatBlock.setNewSubscriber(this, this.#callbackChat);

    this.host = this.getAttribute("host");
    this.ws = new WS(this.host);

    this.#autorizeUser(this.dom.auth);
  }
  #setOwnerUser(place, props) {
    const { avatar, name, hello } = props;
    this.owner = name;
    place.innerHTML = `<user-item avatar="${avatar}" name="${name}" hello="${hello}"/>`;
  }
  #autorizeUser(authComponent) {
    authComponent.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const ownerName = e.path[1][0].value.trim();
        if (ownerName.length >= 3) {
          this.ws.init(this, ownerName, this.#callbackWSData);

          authComponent.classList.add("hide");
          this.#setOwnerUser(this.ownerPlace, {
            avatar: "",
            name: ownerName,
            hello: "Hi all !",
          });
        }
      }
    });
  }
  #callbackWSData(data) {
    // забирает данные события ws:onmessage
    switch (data.type) {
      case "config:id": {
        DB.setOwnerID(data.data.split(":")[0]);
        break;
      }
      case "config:users": {
        DB.setUsers(data.data);
        break;
      }
      case "message": {
        this.chatBlock.addNewMessage(JSON.parse(data.data));
        break;
      }
    }
    this.#updateUsers(this.usersBlock);
  }
  #callbackChat(message) {
    //забирает сообщения из чата
    this.ws.sendUserMessage({ ownerId: DB.getOwnerID(), data: message });
  }
  #updateUsers(place) {
    place.innerHTML = "";
    this.chatBlock.setUsersCounter(DB.getUsers().length);
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
