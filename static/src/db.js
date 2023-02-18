export default new (class {
  constructor() {
    this.ownerID = null;
    this.usersMap = new Map(); // id: {name,avatar,hello}
  }
  setOwnerID(value) {
    this.ownerID = value;
  }
  getOwnerID() {
    return this.ownerID;
  }
  setUsers(value) {
    this.clear();
    value.forEach((data) => {
      console.log("DB", data.id);
      this.usersMap.set(data.id, {
        name: data.name,
        avatar: data.avatar,
        hi: data.hi,
      });
    });
  }
  getUsers() {
    return this.usersMap;
  }
  getUserFromID(id) {
    return this.usersMap.get(id);
  }
  clear() {
    this.usersMap = new Map();
  }
})();
