const Joi = require("joi");

module.exports = function() {
  //  Ensures we can call Joi.objectId() to validate mongo driver object Id's
  Joi.objectId = require("joi-objectid")(Joi);
};
