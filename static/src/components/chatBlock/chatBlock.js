import DB from "../../db.js";
import MessageChat from "../message/message.js";
import template from "./template.js";

export default class Post extends HTMLElement {
  constructor() {
    super();
    this.subscribers = [];
  }
  connectedCallback() {
    this.innerHTML = template.render();
    this.dom = template.map(this);

    this.dom.send.addEventListener("click", (e) => {
      const message = this.dom.message.value.trim();
      if (message) {
        this.subscribers.forEach((subs) => {
          subs.callback.call(subs.scope, message);
        });
      }
    });
  }
  setUsersCounter(value) {
    let base = `${value}`.slice(-1);
    const end = {
      1: "участник",
      2: "участника",
      3: "участника",
      4: "участника",
      5: "участников",
      6: "участников",
      7: "участников",
      8: "участников",
      9: "участников",
    };
    this.dom.counter.innerHTML = `${value} ${end[base]}`;
  }
  setNewSubscriber(scope, fnc) {
    this.subscribers.push({ scope: scope, callback: fnc });
  }
  addNewMessage(message) {
    const avatar = new Image();
    avatar.src = `./img/users/${message.ownerId}.png`;
    function setData(isAvatar){
      const path = isAvatar ? `./img/users/${message.ownerId}.png`: `./img/default.png`;
      return {
        ownerId: message.ownerId,
        avatar: path,
        name: DB.getUserFromID(message.ownerId),
        text: message.data,
        time: new Date(Date.now()).toTimeString().slice(0, 8),
      }
    }
    avatar.addEventListener("load", () => {
      this.dom.chat.appendChild(new MessageChat(setData(true)));
    });
    avatar.addEventListener("error", () => {
      this.dom.chat.appendChild(new MessageChat(setData(false)));
    });
  }
}

if (!customElements.get("chat-block")) {
  customElements.define("chat-block", Post);
}
