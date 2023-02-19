import { User, Message } from "./dbmodel.js";

export default new (class DB {
  /* type user -> { uuid: {ws:ws, data:{id: uuid, name: "Evgeny", avatar: "image path", hi: "hello all !"}} } */
  /* type message -> {id: { ownerId:user_uuid, text: message }} */
  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.ownerID;
  }
  setOwnerID(id) {
    this.ownerID = id;
  }
  getOwnerID() {
    return this.ownerID;
  }
  deleteUser(ws) {
    for (let user of this.users.values()) {
      if (user.ws === ws) {
        this.users.delete(user.data.id);
      }
    }
  }
  setUser(user) {
    const data = {
      ws: user.getSocket(),
      data: user.getData(),
    };
    this.users.set(user.uuid, data);
  }
  getUser(id) {
    return this.users.get(id);
  }
  getUsersAll() {
    return this.users;
  }
  setMessage(message) {
    const key = this.messages.size + 1;
    this.messages.set(key, message.getData());
  }
  getMessagesAll() {
    return this.messages;
  }
})();
