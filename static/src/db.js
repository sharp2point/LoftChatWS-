export default new (class {
  constructor() {
    this.ownerID = null;
    this.users = [
      /* хранит данные о пользователе в формате: */
      /* "a44d7bf2-bf9f-44fd-92dc-84e4597bf216":"Евгений" */
    ];
    this.usersMap = new Map();
  }
  setOwnerID(value) {
    this.ownerID = value;
  }
  getOwnerID() {
    return this.ownerID;
  }
  setUsers(value) {
    this.users = value;
    this.usersMap.set(...value[0].split(":").reverse());
  }
  getUsers() {
    return this.users;
  }
  getUserFromID(id) {
    return this.usersMap.get(id);
  }
})();
