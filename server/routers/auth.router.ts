import express from "express";
import {AuthController} from "../controllers/auth.controller";
import {checkAuth} from "../middlewares/auth.middleware";

const controller = new AuthController();
export const authRouter = express.Router();

authRouter.post("/addRole", checkAuth, controller.addRole);
authRouter.post("/registration", controller.registration);
authRouter.post("/login", controller.login);
