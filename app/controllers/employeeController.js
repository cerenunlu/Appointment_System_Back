const db = require("../models");
const Employee = db.employee;
const Op = db.Sequelize.Op;
var _ = require("underscore");
var bcrypt = require("bcrypt");

exports.create = (req, res) => {
    let body = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        department_id: req.body.department_id,
        role_id: req.body.role_id

    }
    db.Employee.create(body).then(function (employee) {
        res.json(employee.toJSON());
    }), function (e) {
        res.status(500).send();
    }

}

exports.findAll = (req, res) => {
    db.Employee.findAll().then(function (employee) {
        res.json(employee);
    })
}


exports.findOne = (req, res) => {
    let employeeId = req.params.id;
    db.Employee.findOne({
        where: {
            id: employeeId
        }
    }).then(function (employee) {

        res.json(employee);
    })

}

exports.update = (req, res) => {
    let employeeId = req.params.id;

    let body = _.pick(req.body,
        "name",
        "surname",
        "email",
        "password",
        "department_id",
        "role_id");
    let attributes = {};


    if (body.hasOwnProperty("name")) {
        attributes.name = body.name;
    }
    if (body.hasOwnProperty("surname")) {
        attributes.surname = body.surname;
    }
    if (body.hasOwnProperty("email")) {
        attributes.email = body.email;
    }
    if (body.hasOwnProperty("password")) {
        attributes.password = body.password;
    }
    if (body.hasOwnProperty("department_id")) {
        attributes.department_id = body.department_id;
    }
    if (body.hasOwnProperty("role_id")) {
        attributes.role_id = body.role_id;
    }


    db.Employee.findOne({
        where: {
            id: employeeId
        }
    }).then(function (employee) {
        if (employee) {
            employee.update(attributes).then(function (employee) {
                res.json(employee.toJSON());
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


exports.delete = (req, res) => {
    let employeeId = req.params.id;
    db.Employee.destroy({
        where: {
            id: employeeId
        }
    }).then(function (employeeDeleted) {
        if (employeeDeleted === 0) {
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