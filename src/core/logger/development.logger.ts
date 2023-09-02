import {createLogger, format, transports, Logger} from "winston";
const {combine, timestamp, printf, colorize} = format;

const developmentLogger = (): Logger => {
  const consoleFormat = printf(({level, message, timestamp}) => {
    return (
      colorize().colorize(level, `[${level}]: ${timestamp}`) + " " + message
    );
  });

  const fileFormat = printf(({level, message, timestamp}) => {
    return `[${level}] ${timestamp} ${message}`;
  });

  return createLogger({
    level: "debug",
    format: combine(timestamp({format: "YYYY-MM-DD HH:mm:ss"}), consoleFormat),

    transports: [
      new transports.Console(),
      new transports.File({
        level: "error",
        filename: "errors.log",
        format: fileFormat,
      }),
    ],
  });
};

export default developmentLogger;
