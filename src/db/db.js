export default new (class DB {
  /* type user -> { uuid: {ws:ws, data:{id: uuid, name: "Evgeny", avatar: "image path", hi: "hello all !"}} } */
  /* type message -> {id: { ownerId:user_uuid, text: message }} */
  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.subscribers = [];
  }
  addSubscriber(scope, fnc) {
    this.subscribers.push({ scope: scope, callback: fnc });
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
  setUserAvatar(id, avatarPath) {
    const user = this.getUser(id);
    user.data.avatar = avatarPath;
    this.subscribers.forEach((subs) => {
      subs.callback.call(subs.scope);
    });
  }
})();
