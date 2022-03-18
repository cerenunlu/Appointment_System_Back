module.exports=app=>{
    const appointment=require("../controllers/appointmentController");
    const checkAuth = require('../middleware/checkAuth');
var router=require("express").Router();

//create new customer
router.post("/",checkAuth,appointment.create);
//find all customers
  router.get("/",appointment.findAll);
// //find customer by id
router.get("/:id",appointment.findOne);
// //update a customer
router.post("/exist-times",appointment.findExistTimesbyDate);
// //delete customer
router.delete("/:id",appointment.delete);

app.use("/api/appointment",router);

};