const express = require("express");

const controller = require("../controllers/user.controller");

const db = require("../models");
const User = db.user;

const router = express.Router();
module.exports = function (app) {
  app.get("/api/user/friends/:id", controller.getFriends);
  app.get("/api/user/ghosts/:id", controller.getGhosts);
  app.put("/api/user/:id", controller.update);
};
