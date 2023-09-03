import express from "express";
import asyncHandlerHelper from "../../helpers/async-handler.helper";
import signup from "./routes/signup";
import validationMiddleware from "../../middlewares/validation.middleware";
import schema from "./schema";
import login from "./routes/login";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validationMiddleware(schema.signup),
  asyncHandlerHelper(signup)
);
authRouter.post(
  "/login",
  validationMiddleware(schema.login),
  asyncHandlerHelper(login)
);

export default authRouter;
