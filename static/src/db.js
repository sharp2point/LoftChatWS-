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
    value.forEach((data) => {
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
})();
