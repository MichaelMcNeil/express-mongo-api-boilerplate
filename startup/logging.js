const winston = require("winston");
const config = require("config");
require("winston-mongodb");
require("express-async-errors");

module.exports = function() {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtExceptions.log" }),
    new winston.transports.Console({ colorize: true, prettyPrint: true })
  );

  //  For unhandled promise rejections on the process (not inside express),
  //  go ahead and throw an exception.
  process.on("unhandledRejection", ex => {
    throw ex;
  });

  winston.add(
    //Requires winston-mongodb
    new winston.transports.MongoDB({
      db: config.get("db"),
      level: "info"
    })
  );

  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
      level: "info"
    })
  );

  if (process.env.NODE_ENV !== "production") {
    winston.add(
      new winston.transports.Console({
        colorize: true,
        prettyPrint: true
      })
    );
  }
};
