import { WebSocketServer } from "ws";
import { v4 as uuid } from "uuid";
import * as fs from "node:fs";
import { readdir } from "node:fs";

const clients = new Map(); // ws: {id: uuid, name: "Evgeny", avatar: "image path", hi: "hello all !"}
const messages = [];
let avatarPath = "";
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
export const setAvatarPath = (path) => {
  avatarPath = path;
};
const getAvatarPath = () => {
  return avatarPath;
};
const setAvatarByID = (id) => {
  for (let data of clients.values()) {
    if (data.data.id === id) {
      data.data.avatar = getAvatarPath();
      break;
    }
  }
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
        case "config:avatar": {
          setTimeout(() => {
            setAvatarByID(data.data);
            updateUsers();
          }, 1000);

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
