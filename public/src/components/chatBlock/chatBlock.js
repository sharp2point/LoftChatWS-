import DB from "../../db.js";
import MessageChat from "../message/message.js";
import template from "./template.js";

export default class Post extends HTMLElement {
  constructor() {
    super();
    this.subscriber;
  }
  connectedCallback() {
    this.innerHTML = template.render();
    this.dom = template.map(this);

    this.dom.post.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = this.dom.message.value.trim();
      if (message) {
        this.subscriber.callback.call(this.subscriber.scope, message);
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
    this.subscriber = { scope: scope, callback: fnc };
  }
  updateChat() {
    const messages = this.dom.chat.children;
    if (messages.length) {
      for (const child of messages) {
        child.update();
      }
    }
  }
  addNewMessage(message) {
    const owner = DB.getUserFromID(message.ownerID);
    const avatarPath = owner.avatar;
    const avatar = new Image();
    avatar.src = avatarPath;

    function setData(isAvatar) {
      const path = isAvatar ? avatarPath : `./img/default.png`;
      return {
        ownerId: message.ownerID,
        avatar: path,
        name: owner.name,
        text: message.text,
        time: new Date(Date.now()).toTimeString().slice(0, 8),
      };
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
