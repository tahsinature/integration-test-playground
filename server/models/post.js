const db = require("../util/database");
const { Model, DataTypes } = require("sequelize");

class Post extends Model {}

Post.init(
  {
    body: DataTypes.TEXT
  },
  {
    sequelize: db
  }
);

module.exports = Post;
