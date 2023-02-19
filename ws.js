import { WebSocketServer } from "ws";
import { v4 as uuid } from "uuid";
import * as fs from "node:fs";

import { User, Message } from "./src/db/dbmodel.js";
import DB from "./src/db/db.js";
import { send } from "node:process";

// const clients = new Map(); // id: {ws:ws, data: {id: uuid, name: "Evgeny", avatar: "image path", hi: "hello all !"}}
// const messages = [];
// let avatarPath = "";
// let id;

// const updateOwner = () => {
//   const owner = clients.get(id);
//   owner.ws.send(JSON.stringify({ type: "config:owner", data: id }));
// };
// const updateUsers = () => {
//   clients.forEach((value, key, map) => {
//     value.ws.send(
//       JSON.stringify({
//         type: "config:users",
//         data: [...clients.values()].map((item) => {
//           return item.data;
//         }),
//       })
//     );
//   });
// };
// const newClient = (ws, id, data) => {
//   clients.set(id, {
//     ws: ws,
//     data: {
//       id: id,
//       name: data.data.name,
//       avatar: "",
//       hi: "Hello all !",
//     },
//   });
//   updateUsers();
//   return id;
// };
// const uID = (ws, uuid) => {
//   ws.send(JSON.stringify({ type: "config:id", data: uuid }));
// };
// const sendMessageAll = (message) => {
//   clients.forEach((value, key, map) => {
//     value.ws.send(
//       JSON.stringify({
//         type: "message",
//         data: JSON.stringify(message),
//       })
//     );
//   });
// };
// export const setAvatarPath = (path) => {
//   avatarPath = path;
// };
// const getAvatarPath = () => {
//   return avatarPath;
// };
// const setAvatarByID = (id) => {
//   for (let data of clients.values()) {
//     if (data.data.id === id) {
//       data.data.avatar = getAvatarPath();
//       break;
//     }
//   }
// };
function sendOwnerIdSetting(user) {
  user
    .getSocket()
    .send(JSON.stringify({ type: "config:id", data: user.getData().id }));
}
function sendEveryone() {
  const users = DB.getUsersAll();
  users.forEach((value, key, map) => {
    value.ws.send(
      JSON.stringify({
        type: "config:users",
        data: [...users.values()].map((item) => {
          return item.data;
        }),
      })
    );
  });
}
function sendMessageEveryone(message) {
  const users = DB.getUsersAll();
  users.forEach((value, key, map) => {
    value.ws.send(
      JSON.stringify({
        type: "message",
        data: JSON.stringify(message),
      })
    );
  });
}
function sendAllMessagesUser(ws) {
  DB.getMessagesAll().forEach((message) => {
    ws.send(
      JSON.stringify({
        type: "message",
        data: JSON.stringify(message),
      })
    );
  });
}
/*----------------------------------------------*/
export const createWSServer = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", function connection(ws, req) {
    ws.on("message", (msg) => {
      const data = JSON.parse(msg);

      switch (data.type) {
        case "config:client": {
          /* { type: 'config:client', data: { name: 'jok' } } */
          const user = new User(ws, uuid(), data.data.name);
          DB.setUser(user);
          sendEveryone(); // отправить всем пользователям данные о пользователях в БД
          sendOwnerIdSetting(user); // отправить настройки новому пользователю
          sendAllMessagesUser(ws); // отправить все сообщения из БД новому пользователю
          break;
        }
        case "message": {
          /* { type: 'message', data: { ownerId: '76a7804b-7b0c-4b5c-9fd5-120cfe122e9e', text: 'hello' } } */
          const message = new Message(data.data.ownerId, data.data.text);
          DB.setMessage(message);
          sendMessageEveryone(message);
          break;
        }
      }
      // switch (data.type) {
      //   case "config:client": {
      //     uID(ws, newClient(ws, id, data));
      //     break;
      //   }
      //   case "config:avatar": {
      //     setTimeout(() => {
      //       setAvatarByID(data.data);
      //       updateUsers();
      //       //updateOwner();
      //     }, 100);

      //     break;
      //   }
      //   case "message": {
      //     messages.push(data.data);
      //     sendMessageAll(data.data);
      //     break;
      //   }
      // }
    });
    ws.on("close", (e) => {
      DB.deleteUser(ws);
      sendEveryone();
    });
    ws.on("error", console.error);
  });
};
