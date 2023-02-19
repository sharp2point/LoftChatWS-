export default new (class {
  constructor() {
    this.ownerID = null;
    this.users = new Map(); // id: {name,avatar,remark}
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
      this.users.set(data.id, {
        name: data.name,
        avatar: data.avatar,
        remark: data.remark,
      });
    });
  }
  getUsers() {
    return this.users;
  }
  getUserFromID(id) {
    return this.users.get(id);
  }
  clear() {
    this.users = new Map();
  }
})();
