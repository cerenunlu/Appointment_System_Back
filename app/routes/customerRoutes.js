// const express=require('express');
// const router=express.Router();
// var db = require("../index");
// var _ = require("underscore");
module.exports=app=>{
    const customer=require("../controllers/customerController.js");

var router=require("express").Router();

//create new customer
router.post("/",customer.create);
//find all customers
router.get("/",customer.findAll);
//find customer by id
 router.get("/:id",customer.findOne);
// //update a customer
router.put("/:id",customer.update);
// //delete customer
router.delete("/:id",customer.delete);

app.use("/api/customer",router);

};