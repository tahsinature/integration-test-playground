const db = require("../util/database");
const User = require("./user");
const Post = require("./post");

User.hasMany(Post);
Post.belongsTo(User);

// db.sync({ force: true });

module.exports = {
  User,
  Post
};
