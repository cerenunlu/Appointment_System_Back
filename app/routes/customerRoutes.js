// const express=require('express');
// const router=express.Router();
// var db = require("../index");
// var _ = require("underscore");
const checkAuth = require('../middleware/checkAuth');
const checkRole = require('../middleware/checkRole');
module.exports=app=>{
    const customer=require("../controllers/customerController.js");

var router=require("express").Router();

//create new customer
router.post("/",checkAuth,checkRole,customer.create);
//find all customers
router.get("/",checkAuth,customer.findAll);
//find customer by id
 router.get("/:id",checkAuth,customer.findOne);
// //update a customer
router.put("/:id",checkAuth,customer.update);
// //delete customer
router.delete("/:id",checkAuth,customer.delete);

app.use("/api/customer",router);

};