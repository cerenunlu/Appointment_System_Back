const checkAuth = require('../middleware/checkAuth');
const checkRole = require('../middleware/checkRole');
module.exports=app=>{
    const time=require("../controllers/timeController");

var router=require("express").Router();

//create new date
router.post("/",checkAuth,checkRole,time.create);
//find all date
// router.get("/",checkAuth,date.findAll);
// // find customer by id
// //  router.get("/:id",checkAuth,customer.findOne);
// // update a date
router.put("/:id",checkAuth,checkRole,time.update);
 //delete date
router.delete("/:id",checkAuth,checkRole,time.delete);

app.use("/api/time",router);

};