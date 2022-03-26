const checkRole = require("../middleware/checkRole");

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

router.post("/employee_by_department",checkAuth,employee.findByDepartmentId);
// //update a customer
router.put("/:id",checkAuth,checkRole,employee.update);
// //delete customer
router.delete("/:id",checkAuth,checkRole,employee.delete);

app.use("/api/employee",router);

};