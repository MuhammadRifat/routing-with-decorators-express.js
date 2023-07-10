import log4js from "log4js";
import config from "config";
const logConfig = config.get<string>("log4js");

log4js.configure(logConfig);

let logger = log4js.getLogger();

export default logger;