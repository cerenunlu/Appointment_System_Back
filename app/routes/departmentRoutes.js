module.exports=app=>{
    const department=require("../controllers/departmentController");
    const checkAuth = require('../middleware/checkAuth');
    const checkRole = require('../middleware/checkRole');
var router=require("express").Router();

//create new customer
router.post("/",checkAuth,checkRole,department.create);
//find all customers
  router.get("/",checkAuth,checkRole,department.findAll);
// //find customer by id
router.get("/:id",checkAuth,checkRole,department.findOne);
// //update a customer
router.put("/:id",checkAuth,checkRole,department.update);
// //delete customer
router.delete("/:id",checkAuth,checkRole,department.delete);

app.use("/api/department",router);

};