import * as fs from "node:fs";
import * as http from "node:http";
import * as path from "node:path";
import * as dotenv from "dotenv";
import formidable, { errors as formidableErrors } from "formidable";
import { MIME_TYPES } from "./src/utils/mime.js";
import { createWSServer } from "./ws.js";

import { User, Message } from "./src/db/dbmodel.js";
import DB from "./src/db/db.js";

dotenv.config();

const PORT = process.env.PORT;
const AVATAR_API_ROUT = process.env.AVATAR_API_ROUT;
const SERVER_IMG_PATH = process.env.SERVER_IMG_PATH;
const CLIENT_IMG_PATH = process.env.CLIENT_IMG_PATH;
const STATIC_PATH = path.join(process.cwd(), "./public/");
const toBool = [() => true, () => false];

const prepareFile = async (url) => {
  const paths = [STATIC_PATH, url];
  if (url.endsWith("/")) paths.push("index.html");

  const filePath = path.join(...paths);

  const pathTraversal = !filePath.startsWith(STATIC_PATH);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;

  const streamPath = found ? filePath : STATIC_PATH + "/404.html";
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};

const server = http.createServer(async (req, res) => {
  if (req.method.toLowerCase() === "get") {
    const file = await prepareFile(req.url);
    const statusCode = file.found ? 200 : 404;
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;

    res.writeHead(statusCode, { "Content-Type": mimeType });
    file.stream.pipe(res);
    console.log(`Server: ${req.method} ${req.url} ${statusCode}`);
  }
  // --------------- POST ----------------------
  if (req.url === AVATAR_API_ROUT && req.method.toLowerCase() === "post") {
    const form = formidable({});

    form.parse(req, (err, fields, files) => {
      if (err) {
        if (err.code === formidableErrors.maxFieldsExceeded) {
        }
        res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" });
        res.end(String(err));
        return;
      }
      const prevpath = files.avatar[0].filepath;
      const ownerID = fields.id[0];

      const path = `${SERVER_IMG_PATH}${ownerID}.${
        files.avatar[0].mimetype.split("/")[1]
      }`;

      var is = fs.createReadStream(prevpath);

      is.pipe(fs.createWriteStream(path));
      is.on("end", function () {
        fs.unlinkSync(prevpath);
      });

      const clientPath = `${CLIENT_IMG_PATH}${ownerID}.${
        files.avatar[0].mimetype.split("/")[1]
      }`;
      DB.setUserAvatar(ownerID, clientPath);

      res.statusCode = 204;
      res.end();
    });

    return;
  }
});

createWSServer(server);

server.listen(PORT);
