"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const server_config_1 = require("./server.config");
const app = (0, express_1.default)(); // создание экземпляра приложения express
const server = http_1.default.createServer(app); // создание HTTP-сервера
// Используйте express.json() для парсинга JSON тела запроса
app.use(express_1.default.json());
// запуск сервера приложения
server.listen(server_config_1.serverConfig.PORT, server_config_1.serverConfig.HOSTNAME, () => {
    console.log(`Server started at http://${server_config_1.serverConfig.HOSTNAME}:${server_config_1.serverConfig.PORT}`);
});
//# sourceMappingURL=index.js.map