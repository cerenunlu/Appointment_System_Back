module.exports = app => {
  const role = require("../controllers/roleController");
  const checkAuth = require('../middleware/checkAuth');
  var router = require("express").Router();

  //create new customer
  router.post("/",role.create);
  //find all customers
  router.get("/", checkAuth,role.findAll);
  // //find customer by id
  router.get("/:id", checkAuth, role.findOne);
  // //update a customer
  router.put("/:id", checkAuth,role.update);
  // //delete customer
  router.delete("/:id",role.delete);

  app.use("/api/role", router);

};