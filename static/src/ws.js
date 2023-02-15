import DB from "./db.js";

export default class {
  constructor(host) {
    this.host = host;
  }
  init(value) {
    this.ws = new WebSocket(this.host);
    this.ws.onopen = (e) => {
      this.ws.send(JSON.stringify({ new: true, name: value }));
    };
    this.ws.onclose = () => {
      
    };
    
    return this.ws;
  }
}
