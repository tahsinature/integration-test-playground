var express = require("express");
var router = express.Router();
const { User } = require("../models");

router.get("/", async function(req, res, next) {
  const users = await User.findAll({ raw: true });
  if (users.length < 1) return res.status(404).send("No users found");
  res.status(200).send(users);
});

router.get("/:id", async function(req, res, next) {
  const user = await User.findByPk(req.params.id, { raw: true });
  if (!user) return res.status(404).send("No User Found");
  res.status(200).send(user);
});

router.post("/", async function(req, res, next) {
  const user = await User.create({
    name: req.body.name,
    age: req.body.age
  });
  res.status(201).send({ token: user.generateJWT() });
});

router.put("/:id", async function(req, res, next) {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).send("No user found");
  user.set("name", req.body.name);
  user.set("age", req.body.age);
  await user.save();
  res.status(200).send(user.toJSON());
});

router.delete("/:id", async function(req, res, next) {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).send("No user found");
  await user.destroy();
  res.status(200).send("User Deleted");
});

module.exports = router;
