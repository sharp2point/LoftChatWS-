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
    this.hostAPI = "http://localhost:8000/api/set/avatar";
  }
  connectedCallback() {
    this.innerHTML = template.render();
    this.dom = template.map(this);
    this.dom.menuButton.addEventListener("click", () => {
      this.dom.chatUsers.classList.toggle("openUserBlock");
    });
    this.dom.chatBlock.setNewSubscriber(this, this.#callbackChat); // подписка на сообщения

    this.host = this.getAttribute("host");
    this.ws = new WS(this.host);

    this.#autorizeUser(this.dom.auth);
  }
  #autorizeUser(authComponent) {
    authComponent.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const ownerName = e.path[1][0].value.trim(); // забираем имя пользователя
        if (ownerName.length >= 3) {
          this.ws.init(this, ownerName, this.#callbackWSData); // создать нового пользователя на сервере

          authComponent.classList.add("hide");
        }
      }
    });
  }
  #refreshOwnerUser() {
    this.dom.owner.innerHTML = "";
    const item = new UserItem(DB.getOwnerID(), this.hostAPI);
    item.setNewSubscriber(this, this.#callbackChangeAvatar);
    this.dom.owner.appendChild(item);
  }
  // забирает данные события ws:onmessage
  #callbackWSData(data) {
    switch (data.type) {
      case "config:id": {
        DB.setOwnerID(data.data);
        this.#refreshOwnerUser();
        break;
      }
      case "config:users": {
        DB.setUsers(data.data);
        if (DB.getOwnerID()) this.#refreshOwnerUser();
        break;
      }
      case "message": {
        this.dom.chatBlock.addNewMessage(JSON.parse(data.data));
        break;
      }
    }
    this.dom.chatBlock.updateChat();
    this.#updateUsers();
  }

  //забирает сообщения из чата
  #callbackChat(message) {
    this.ws.sendUserMessage({ ownerId: DB.getOwnerID(), text: message });
  }

  //сообщает на сервер об изменениях аватара пользователя
  #callbackChangeAvatar(uuid) {
    this.ws.changeAvatar(uuid);
  }

  // обновляет список пользователей
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
