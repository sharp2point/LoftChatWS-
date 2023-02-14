export default (value) => {
  const ws = new WebSocket("ws://localhost:8000");

  ws.onopen = (event) => {
    ws.send(`Hi: ${value}`);
  };
  ws.onmessage = (message) => {
    console.log(message.data);
  };
  ws.onclose = () => {
    console.log("Socket close");
  };
  console.log("NIK:", value);
};
