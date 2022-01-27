const db=require("../models");
const Department=db.role;
const Op=db.Sequelize.Op;
var _ = require("underscore");


exports.create=(req,res)=>{
    let body = _.pick(req.body, 
        "name",
        
        );
    db.Department.create(body).then(function (department) {
        res.json(department.toJSON());
    }), function (e) {
        res.status(500).send();
    }

}

exports.findAll=(req,res)=>{
    db.Department.findAll().then(function (department) {
        res.json(department);
    })
}

exports.findOne=(req,res)=>{
    let departmentId=req.params.id;
    db.Department.findOne({
        where: {
            id: departmentId
        }
    }).then(function (department) {

        res.json(department);
    })

}
exports.update=(req,res)=>{
    let departmentId = req.params.id;
    
    let body = _.pick(req.body, 
        "name",);
    let attributes = {};


    if (body.hasOwnProperty("name")) {
        attributes.name = body.name;
    }
    
    db.Department.findOne({
        where: {
            id: departmentId
        }
    }).then(function (department) {
        if (department) {
            department.update(attributes).then(function (department) {
                res.json(department.toJSON());
            }, function () {
                res.status(400).send();
            })
        } else {
            res.status(404).send({
                error: "id not found!"
            })
        }
    }, function () {
        res.status(500).send();
    })

}

exports.delete=(req,res)=>{
    let departmentId = req.params.id;

    db.Employee.findOne({
        where: {
            department_id: departmentId
        }
    }).then(function (employee) {
        if (employee) {
            
            res.status(403).send({
                error: "This department has an employee or employees"
            })
        } else {
            db.Department.destroy({
                where: {
                    id: departmentId
                }
            }).then(function (departmentDeleted) {
                if (departmentDeleted === 0) {
                    res.status(404).send({
                        error: "id not found..."
                    });
                } else {
                    res.status(204).send();
                }
            }, function () {
                res.status(500).send();
            })
        }
    }, function () {
        res.status(500).send();
    })

   
}
