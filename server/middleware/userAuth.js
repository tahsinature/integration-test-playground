const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const debugError = require("debug")("error");
const response = require("../util/response");
const getTestToken = require("../util/getTestToken");

/** @type {express.RequestHandler} */
module.exports = (req, res, next) => {
  /** @type {String} */
  let token = req.header["x-auth-token"] || req.headers.authorization;
  if (!token) return res.status(401).send("No Auth Header");
  if (token.startsWith("Bearer ")) token = token.slice(7, token.length);

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (error) {
    debugError(error.message);
    return response.unauthorized("Token is not valid", res);
  }
};
