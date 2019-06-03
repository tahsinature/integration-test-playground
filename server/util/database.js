const { Sequelize } = require("sequelize");
const config = require("config");
const path = require("path");
const dbFileName = config.get("db.name");
const DB_PATH = path.join(__dirname, dbFileName);

module.exports = new Sequelize({
  dialect: "sqlite",
  storage: DB_PATH,
  logging: false
});
