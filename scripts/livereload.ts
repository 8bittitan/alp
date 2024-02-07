#!/usr/bin/env bun
import { Elysia } from "elysia";

let wsConnections = new Set<any>();

function dispatch() {
  wsConnections.forEach((ws) => {
    ws.send("reload");
  });
}

const port = process.argv[2] || 3001;

const app = new Elysia()
  .ws("/ws", {
    open(ws) {
      wsConnections.add(ws);
    },
    close(ws) {
      wsConnections.delete(ws);
    },
  })
  .get("/reload", () => {
    dispatch();
  })
  .listen(port);

console.log(`Livereload server running at ${app.server?.url}`);
