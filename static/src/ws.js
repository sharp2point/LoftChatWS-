export default class {
  constructor(host) {
    this.host = host;
  }
  init(scope, value, fnc) {
    this.ws = new WebSocket(this.host);
    this.ws.onopen = (e) => {
      this.ws.send(
        JSON.stringify({ type: "config:client", data: { name: value } })
      );
    };
    this.ws.onmessage = (msg) => {
      fnc.call(scope, JSON.parse(msg.data));
    };
    this.ws.onclose = () => {};
  }
  sendUserMessage(message) {
    this.ws.send(JSON.stringify({ type: "message", data: message }));
  }
}
