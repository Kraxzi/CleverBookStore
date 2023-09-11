import express from "express";
import asyncHandlerHelper from "../../helpers/async-handler.helper";
import signup from "./routes/signup";
import validationMiddleware from "../../middlewares/validation.middleware";
import schema from "./schema";
import login from "./routes/login";
import refresh from "./routes/refresh";
import authenticationMiddleware from "../../middlewares/authentication.middleware";

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
authRouter.post(
  "/refresh",
  authenticationMiddleware,
  validationMiddleware(schema.refreshToken),
  asyncHandlerHelper(refresh)
);

export default authRouter;
