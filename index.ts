import express from "express";
import axios from "axios";
import http from "http";
import ws, { type WebSocket } from "ws";
import { serverConfig } from "./server.config";

const app = express(); // создание экземпляра приложения express
const server = http.createServer(app); // создание HTTP-сервера

// Используйте express.json() для парсинга JSON тела запроса
app.use(express.json());

// запуск сервера приложения
server.listen(serverConfig.PORT, serverConfig.HOSTNAME, () => {
  console.log(
    `Server started at http://${serverConfig.HOSTNAME}:${serverConfig.PORT}`
  );
});
