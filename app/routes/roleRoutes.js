module.exports = app => {
  const role = require("../controllers/roleController");

  var router = require("express").Router();

  //create new customer
  router.post("/", role.create);
  //find all customers
  router.get("/", role.findAll);
  // //find customer by id
  router.get("/:id", role.findOne);
  // //update a customer
  router.put("/:id",role.update);
  // //delete customer
  router.delete("/:id",role.delete);

  app.use("/api/role", router);

};