import { WebSocketServer } from "ws";
import { v4 as uuid } from "uuid";

import { User, Message } from "./src/db/dbmodel.js";
import DB from "./src/db/db.js";


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
function callbackUpdateAvatar() {
  console.log("Avatar Update");
  setTimeout(() => {
    sendEveryone();
  }, 100);
}
/*----------------------------------------------*/
export const createWSServer = (server) => {
  const wss = new WebSocketServer({ server });
  DB.addSubscriber(this, callbackUpdateAvatar); // 

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
      
    });
    ws.on("close", (e) => {
      DB.deleteUser(ws);
      sendEveryone();
    });
    ws.on("error", console.error);
  });
};
