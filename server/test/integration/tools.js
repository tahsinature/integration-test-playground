const { User } = require("../../models");

module.exports.createUserAndGetToken = async () => {
  const user = await User.create({ name: "test", age: 1 });
  const token = user.generateJWT();
  return token;
};
