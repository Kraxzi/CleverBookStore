import mongoose from "mongoose";
import logger from "../core/logger";
import {dbUri} from "../config";

mongoose
  .connect(dbUri)
  .then(() => {
    logger.info("Mongoose connection done");
  })
  .catch((e) => {
    logger.info("Mongoose connection error");
    logger.error(e);
  });

mongoose.connection.on("connected", () => {
  logger.debug("Mongoose connection open");
});

mongoose.connection.on("error", (err) => {
  logger.error("Mongoose connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
  logger.info("Mongoose connection disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close().then(() => {
    logger.info(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});
