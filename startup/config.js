const config = require("config");

module.exports = function() {
  //  Remember to VERIFY important environment variables at app startup
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey not defined.");

    //  Exit the process so that our process manager can cleanup and restart
    process.exit(1);
  }
};
