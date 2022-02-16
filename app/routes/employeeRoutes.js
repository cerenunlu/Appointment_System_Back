module.exports=app=>{
    const employee=require("../controllers/employeeController");
    const checkAuth = require('../middleware/checkAuth');
var router=require("express").Router();

//create new customer
router.post("/",checkAuth,employee.create);
//find all customers
 router.get("/",checkAuth,employee.findAll);
 //find customer by id
router.get("/:id",checkAuth,employee.findOne);
// //update a customer
router.put("/:id",checkAuth,employee.update);
// //delete customer
router.delete("/:id",checkAuth,employee.delete);

app.use("/api/employee",router);

};