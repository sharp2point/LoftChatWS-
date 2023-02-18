import { WebSocketServer } from "ws";
import { v4 as uuid } from "uuid";

const clients = new Map(); // ws: {id: uuid, name: "Evgeny", avatar: "image path", hi: "hello all !"}
const messages = [];
let id;

export const getWSUID = () => id;

const updateUsers = () => {
  clients.forEach((value, key, map) => {
    value.ws.send(
      JSON.stringify({
        type: "config:users",
        data: [...clients.values()].map((item) => {
          return item.data;
        }),
      })
    );
  });
};
const newClient = (ws, id, data) => {
  clients.set(id, {
    ws: ws,
    data: {
      id: id,
      name: data.data.name,
      avatar: "",
      hi: "Hello all !",
    },
  });
  updateUsers();
  return id;
};
const uID = (ws, uuid) => {
  ws.send(JSON.stringify({ type: "config:id", data: uuid }));
};
const sendMessageAll = (message) => {
  clients.forEach((value, key, map) => {
    value.ws.send(
      JSON.stringify({
        type: "message",
        data: JSON.stringify(message),
      })
    );
  });
};
const changeWSAvatar = (pathAvatar) => {
  ws.send(
    JSON.parse({
      type: "config:avatar",
      data: { id: getWSUID(), path: pathAvatar },
    })
  );
};
/*----------------------------------------------*/
export const createWSServer = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", function connection(ws, req) {
    id = uuid();

    ws.on("message", (msg) => {
      const data = JSON.parse(msg);
      switch (data.type) {
        case "config:client": {
          uID(ws, newClient(ws, id, data));
          break;
        }
        case "message": {
          messages.push(data.data);
          sendMessageAll(data.data);
          break;
        }
      }
    });
    ws.on("close", () => {
      clients.delete(id);
      updateUsers();
      console.log(`User ${id} close chat !`);
    });
    ws.on("error", console.error);
  });
};
