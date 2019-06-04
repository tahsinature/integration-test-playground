const { User } = require("../models");

module.exports = async id => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("No user found with given id");
  const token = user.generateJWT();
  return token;
};
