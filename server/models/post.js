const db = require("../util/database");
const { Model, DataTypes } = require("sequelize");

class Post extends Model {}

Post.init(
  {
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize: db
  }
);

module.exports = Post;
