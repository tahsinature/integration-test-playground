const Joi = require("@hapi/joi");

module.exports.schemas = {
  users: {
    createUser: Joi.object().keys({
      name: Joi.string().required(),
      age: Joi.number().required()
    })
  }
};

module.exports.validate = (data, schema) => {
  return Joi.validate(data, schema);
};
