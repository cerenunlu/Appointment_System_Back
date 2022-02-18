module.exports = app => {
  // const { verifySignUp } = require("../middleware");
  const authToken = require("../middleware/authJwt");
  const controller = require("../controllers/auth.controller");
  const checkAuth = require('../middleware/checkAuth');

  var router = require("express").Router();

  router.post("/signup",controller.signup);

  
  router.post("/signin",controller.signin);

  app.use("/api/auth", router);
};