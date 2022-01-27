const db=require("../models");
const Role=db.role;
const Op=db.Sequelize.Op;
var _ = require("underscore");


exports.create=(req,res)=>{
    let body = _.pick(req.body, 
        "name",
        
        );
    db.Role.create(body).then(function (role) {
        res.json(role.toJSON());
    }), function (e) {
        res.status(500).send();
    }

}

exports.findAll=(req,res)=>{
    db.Role.findAll().then(function (roles) {
        res.json(roles);
    })
}

exports.findOne=(req,res)=>{
    let roleId=req.params.id;
    db.Role.findOne({
        where: {
            id: roleId
        }
    }).then(function (role) {

        res.json(role);
    })

}
exports.update=(req,res)=>{
    let roleId = req.params.id;
    
    let body = _.pick(req.body, "name");
    let attributes = {};


    if (body.hasOwnProperty("name")) {
        attributes.name = body.name;
    }

    db.Role.findOne({
        where: {
            id: roleId
        }
    }).then(function (role) {
        if (role) {
            role.update(attributes).then(function (role) {
                res.json(role.toJSON());
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
    let roleId = req.params.id;

    db.Employee.findOne({
        where: {
            role_id: roleId
        }
    }).then(function (employee) {
        if (employee) {
            
            res.status(403).send({
                error: "This role has an employee or employees"
            })
        } else {
            db.Role.destroy({
                where: {
                    id: roleId
                }
            }).then(function (roleDeleted) {
                if (roleDeleted === 0) {
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