module.exports=app=>{
    const department=require("../controllers/departmentController");
    const checkAuth = require('../middleware/checkAuth');
var router=require("express").Router();

//create new customer
router.post("/",checkAuth,department.create);
//find all customers
  router.get("/",checkAuth,department.findAll);
// //find customer by id
router.get("/:id",checkAuth,department.findOne);
// //update a customer
router.put("/:id",checkAuth,department.update);
// //delete customer
router.delete("/:id",checkAuth,department.delete);

app.use("/api/department",router);

};