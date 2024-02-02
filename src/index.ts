import { Elysia } from "elysia";
import staticPlugin from "@elysiajs/static";

import pagesRouter from "~/pages";
import controllerRouter from "~/controllers";

const app = new Elysia()
  .use(staticPlugin())
  .use(controllerRouter)
  .use(pagesRouter)
  .listen(3000);

export type App = typeof app;

console.log(`🦊 Elysia is running at ${app.server?.url}`);
