export class User {
  constructor(socket, uuid, name, avatar = "", remark = "hi all !") {
    this.socket = socket;
    this.uuid = uuid;
    this.name = name;
    this.avatar = avatar;
    this.remark = remark;
  }
  getSocket() {
    return this.socket;
  }
  getData() {
    return {
      id: this.uuid,
      name: this.name,
      avatar: this.avatar,
      remark: this.remark,
    };
  }
}
export class Message {
  constructor(ownerID, text) {
    this.ownerID = ownerID;
    this.text = text;
  }
  getData(){
    return {
      ownerID: this.ownerID,
      text: this.text,
    }
  }
}
