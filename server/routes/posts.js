var express = require("express");
var router = express.Router();
const response = require("../util/response");
const { User, Post } = require("../models");
const { schemas, validate } = require("../util/joiValidate");

router.get("/", async (req, res, next) => {
  const posts = await Post.findAll();
  if (posts.length < 1) return response.notFound("No posts found", res);
  response.success("Posts found", res, posts);
});

router.post("/", async (req, res, next) => {
  validate(req.body, schemas.posts.createPost, next);
  const user = await User.findByPk(req.user.id).catch(err => {
    next(err);
    throw err;
  });
  const post = await user.createPost(req.body).catch(err => {
    next(err);
    throw err;
  });
  response.success("Post created", res, post);
});

// router.put("/:id", async (req, res, next) => {
//   if (validate(req.body, schemas.posts.editPost).error)
//     return response.badRequest("Invalid Input", res);
//   const user = await User.findByPk(req.user.id);
//   const post = await user.createPost(req.body).catch(err => {
//     next(err);
//     throw err;
//   });
//   response.success("Post created", res, post);
// });

module.exports = router;
