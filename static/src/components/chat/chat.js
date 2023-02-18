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
  }
  connectedCallback() {
    this.innerHTML = template.render();
    this.dom = template.map(this);
    this.dom.chatBlock.setNewSubscriber(this, this.#callbackChat);

    this.host = this.getAttribute("host");
    this.ws = new WS(this.host);

    this.#autorizeUser(this.dom.auth);
  }
  #autorizeUser(authComponent) {
    authComponent.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const ownerName = e.path[1][0].value.trim();
        if (ownerName.length >= 3) {
          this.ws.init(this, ownerName, this.#callbackWSData);

          authComponent.classList.add("hide");
        }
      }
    });
  }
  #callbackWSData(data) {
    // забирает данные события ws:onmessage
    switch (data.type) {
      case "config:id": {
        DB.setOwnerID(data.data.split(":")[0]);
        this.dom.owner.appendChild(new UserItem(DB.getOwnerID(), this.host));
        break;
      }
      case "config:users": {
        DB.setUsers(data.data);
        break;
      }
      case "message": {
        this.dom.chatBlock.addNewMessage(JSON.parse(data.data));
        break;
      }
    }
    this.#updateUsers();
  }
  #callbackChat(message) {
    //забирает сообщения из чата
    this.ws.sendUserMessage({ ownerId: DB.getOwnerID(), data: message });
  }
  #updateUsers() {
    const users = DB.getUsers();
    this.dom.chatBlock.setUsersCounter(DB.getUsers().size);
    this.dom.usersBlock.clear();
    users.forEach((val, key, map) => {
      if (key !== DB.getOwnerID())
        this.dom.usersBlock.appendChild(new UserItem(key));
    });
  }
}

if (!customElements.get("loft-chat")) {
  customElements.define("loft-chat", Chat);
}
