const express = require("express");
const router = express.Router();
const response = require("../util/response");
const { User } = require("../models");
const { schemas, validate } = require("../util/joiValidate");

router.get("/", async function(req, res, next) {
  validate(req.body, {}, next);
  const users = await User.findAll({ raw: true });
  if (users.length < 1) return response.notFound("No users found", res);
  response.success("Found Users", res, users);
});

router.post("/", async function(req, res, next) {
  validate(req.body, schemas.users.createUser, next);
  const user = await User.create({
    name: req.body.name,
    age: req.body.age
  });
  response.success("User created", res, { token: user.generateJWT() });
});

router.get("/:id", async function(req, res, next) {
  validate(req.body, {}, next);
  const user = await User.findByPk(req.params.id, { raw: true });
  if (!user) return response.notFound("No User Found", res);
  response.success("User Found", res, user);
});

router.put("/:id", async function(req, res, next) {
  validate(req.body, schemas.users.editUser, next);
  const user = await User.findByPk(req.params.id).catch(err => {
    next(err);
    throw err;
  });
  if (!user) return res.status(404).send("No user found");
  if (req.body.name) user.set("name", req.body.name);
  if (req.body.age) user.set("age", req.body.age);
  await user.save();
  response.success("User Edited", res, user.toJSON());
});

router.delete("/:id", async function(req, res, next) {
  validate(req.body, {}, next);
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).send("No user found");
  await user.destroy();
  response.success("User Deleted", res);
});

module.exports = router;
