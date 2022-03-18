const {
   allCustomers,
   Customer,
   newCustomer,
   deleteCustomer
  } = require("../database/db");
const { modelService } = require("./modelService");
const Op = require('sequelize').Op;

module.exports.findAllCustomers=async(req)=>{
    try {
        const allCustomers = await modelService.findAll(allCustomers);
        return allCustomers;
    } catch (error) {
    }
}

module.exports.findCustomer=async(req)=>{
    try {
        const customer_id=req.body.customer_id
         Customer = await modelService.findOne(Customer,customer_id);
        return Customer;
    } catch (error) {
    }
}

module.exports.create=async(req)=>{
    try {
        let body = _.pick(req.body, 
            "name",
            "surname", 
            "email", 
            "password",
            "appointmentDate",
            "employee_id"
           
            );
        newCustomer=await modelService.create(newCustomer,body);
        return newCustomer;
    } catch (error) {
    }
}

module.exports.delete=async(req)=>{
    let customerid = {
        where: {
            id: req.body.id
        }
    }
    try {
        await modelService.destroy(deleteCustomer, customerid)
    } catch (error) {
    }
}