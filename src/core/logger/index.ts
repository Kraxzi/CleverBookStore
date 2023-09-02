import {Logger} from "winston";
import developmentLogger from "./development.logger";
import {environment} from "../../config";

let logger = new Logger();

if (environment === "development") {
  logger = developmentLogger();
}

export default logger;
