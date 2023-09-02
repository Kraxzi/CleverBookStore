import {port} from "./config";
import app from "./app";
import logger from "./core/logger";

app
  .listen(port, () => {
    logger.info(`Server is running on port: ${port}`);
  })
  .on("error", (e) => logger.error(e));
