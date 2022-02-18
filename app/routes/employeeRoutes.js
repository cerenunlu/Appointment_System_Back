const checkRole = require("../middleware/checkRole");

module.exports=app=>{
    const employee=require("../controllers/employeeController");
    const checkAuth = require('../middleware/checkAuth');
var router=require("express").Router();

//create new customer
router.post("/",checkAuth,checkRole,employee.create);
//find all customers
 router.get("/",checkAuth,checkRole,employee.findAll);
 //find customer by id
router.get("/:id",checkAuth,checkRole,employee.findOne);
// //update a customer
router.put("/:id",checkAuth,checkRole,employee.update);
// //delete customer
router.delete("/:id",checkAuth,checkRole,employee.delete);

app.use("/api/employee",router);

};