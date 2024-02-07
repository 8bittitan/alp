import { Elysia } from "elysia";

import authControllers from "~/controllers/authController";
import linksController from "~/controllers/linksController";

const controllerRouter = new Elysia({
  name: "@router/controllers",
  prefix: "/api",
})
  .use(authControllers)
  .use(linksController);

export default controllerRouter;
