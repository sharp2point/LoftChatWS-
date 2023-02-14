import * as fs from "node:fs";
import * as http from "node:http";
import * as path from "node:path";
import * as dotenv from "dotenv";
import { MIME_TYPES } from "./src/utils/mime.js";

dotenv.config();

const PORT = process.env.PORT ?? 8001;
const STATIC_PATH = path.join(process.cwd(), "./static/");
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

http
  .createServer(async (req, res) => {
    const file = await prepareFile(req.url);
    const statusCode = file.found ? 200 : 404;
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;

    res.writeHead(statusCode, { "Content-Type": mimeType });
    file.stream.pipe(res);
    console.log(`Server: ${req.method} ${req.url} ${statusCode}`);
  })
  .listen(PORT);
