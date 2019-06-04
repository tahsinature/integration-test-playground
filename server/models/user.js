const db = require("../util/database");
const { Model, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const config = require("config");

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
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
