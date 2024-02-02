import { Elysia } from "elysia";

import authControllers from "./authController";

const controllerRouter = new Elysia({
  name: "@router/controllers",
  prefix: "/api",
}).use(authControllers);

export default controllerRouter;
