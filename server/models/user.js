const db = require("../util/database");
const { Model, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const config = require("config");

class User extends Model {}

User.init(
  {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER
  },
  {
    sequelize: db
  }
);

User.prototype.generateJWT = function() {
  const { id } = this;
  const token = jwt.sign({ id }, config.get("jwtPrivateKey"));
  return token;
};

module.exports = User;
