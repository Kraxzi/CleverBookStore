import express from "express";
import asyncHandlerHelper from "../../helpers/async-handler.helper";
import signup from "./routes/signup";

const authRouter = express.Router();

authRouter.post("/signup", asyncHandlerHelper(signup));

export default authRouter;
