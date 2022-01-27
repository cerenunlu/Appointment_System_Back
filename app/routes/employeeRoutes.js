module.exports=app=>{
    const employee=require("../controllers/employeeController");

var router=require("express").Router();

//create new customer
router.post("/",employee.create);
//find all customers
  router.get("/",employee.findAll);
 //find customer by id
router.get("/:id",employee.findOne);
// //update a customer
router.put("/:id",employee.update);
// //delete customer
router.delete("/:id",employee.delete);

app.use("/api/employee",router);

};