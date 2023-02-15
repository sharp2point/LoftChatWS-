export default new (class {
  constructor() {
    this.ownerID = null;
    this.users = [];
  }
  setOwnerID(value) {
    this.ownerID = value;
  }
  getOwnerID() {
    return this.ownerID;
  }
  setUsers(value) {
    this.users = value;
  }
  getUsers() {
    return this.users;
  }
})();
