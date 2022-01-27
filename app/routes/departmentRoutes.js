module.exports=app=>{
    const department=require("../controllers/departmentController");

var router=require("express").Router();

//create new customer
router.post("/",department.create);
//find all customers
  router.get("/",department.findAll);
// //find customer by id
router.get("/:id",department.findOne);
// //update a customer
router.put("/:id",department.update);
// //delete customer
router.delete("/:id",department.delete);

app.use("/api/department",router);

};