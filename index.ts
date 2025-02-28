import express, { Request, Response } from "express";
import axios from "axios";
import http from "http";
import ws, { type WebSocket } from "ws";
import { serverConfig } from "./server.config";

const app = express(); // создание экземпляра приложения express
const server = http.createServer(app); // создание HTTP-сервера

// Используйте express.json() для парсинга JSON тела запроса
app.use(express.json());

// In-memory data store
let items: { id: number; name: string }[] = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

// GET /items - Get all items
app.get("/items", (req: Request, res: Response) => {
  res.json(items);
});

// GET /items/:id - Get a single item by ID
app.get("/items/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const item = items.find((i) => i.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// POST /items - Create a new item
app.post("/items", (req: Request, res: Response) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT /items/:id - Update an item by ID
app.put("/items/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const item = items.find((i) => i.id === id);
  if (item) {
    item.name = req.body.name;
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// PATCH /items/:id - Partially update an item by ID
app.patch("/items/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const item = items.find((i) => i.id === id);
  if (item) {
    item.name = req.body.name || item.name;
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// DELETE /items/:id - Delete an item by ID
app.delete("/items/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((i) => i.id === id);
  if (index !== -1) {
    items.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// запуск сервера приложения
server.listen(serverConfig.PORT, serverConfig.HOSTNAME, () => {
  console.log(
    `Server started at http://${serverConfig.HOSTNAME}:${serverConfig.PORT}`
  );
});
