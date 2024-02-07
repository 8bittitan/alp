import { logger } from "@bogeychan/elysia-logger";
import { Elysia } from "elysia";
import pretty from "pino-pretty";
import auth from "~/lib/auth";
import db from "~/lib/db";
import redis from "~/lib/redis";

const stream = pretty({
  colorize: true,
});

const ctx = new Elysia({
  name: "@middleware/ctx",
})
  .decorate("db", db)
  .decorate("auth", auth)
  .decorate("redis", redis)
  .use(
    logger({
      stream,
    })
  );

export default ctx;
