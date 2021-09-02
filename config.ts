import log4js from "log4js";

log4js.configure({
  appenders: { app: { type: "file", filename: "./app.log" } },
  categories: { default: { appenders: ["app"], level: "info" } },
});
export const logger = log4js.getLogger("app");

export const TEST_ENV = process.env.TEST_ENV;
