import express from "express";
import logger from "./core/logger";
import NotFoundError from "./core/error/not-found.error";
import errorHandler from "./middlewares/error-handler.middleware";
import {Request, Response, NextFunction} from "express";
import router from "./routes";
import "./database";

process.on("uncaughtException", (e) => {
  logger.error(e);
});

const app = express();

app.use(express.json());

app.use("/", router);

app.use((req: Request, res: Response, next: NextFunction) =>
  next(new NotFoundError())
);

app.use(errorHandler);

export default app;
