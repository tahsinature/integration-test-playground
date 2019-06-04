var express = require("express");
var router = express.Router();
const response = require("../util/response");
const { User, Post } = require("../models");

router.get("/", async (req, res, next) => {
  const posts = await Post.findAll();
  if (posts.length < 1) return response.notFound("No posts found", res);
  response.success("Posts found", res, posts);
});

module.exports = router;
