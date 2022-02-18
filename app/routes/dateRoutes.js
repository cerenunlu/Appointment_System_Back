const checkAuth = require('../middleware/checkAuth');

module.exports=app=>{
    const date=require("../controllers/dateController");

var router=require("express").Router();

//create new date
router.post("/",checkAuth,date.create);
//find all date
router.get("/",checkAuth,date.findAll);
// find customer by id
//  router.get("/:id",checkAuth,customer.findOne);
// update a date
router.put("/:id",checkAuth,date.update);
// delete date
router.delete("/:id",checkAuth,date.delete);

app.use("/api/date",router);

};