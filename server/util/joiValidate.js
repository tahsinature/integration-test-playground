const Joi = require("@hapi/joi");

module.exports.schemas = {
  users: {
    createUser: Joi.object().keys({
      name: Joi.string().required(),
      age: Joi.number().required()
    }),
    editUser: Joi.object().keys({
      name: Joi.string(),
      age: Joi.number()
    })
  },
  posts: {
    createPost: Joi.object().keys({
      body: Joi.string().required()
    }),
    editPost: Joi.object().keys({
      body: Joi.string().required()
    })
  }
};

module.exports.validate = (data, schema, next) => {
  const { error } = Joi.validate(data, schema);
  if (error) {
    error.message = "Invalid Input";
    error.httpCode = 400;
    next(error);
    throw error;
  }
};
