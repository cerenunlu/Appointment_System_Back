const db = require("../models");
const customer = db.customer;
const Op = db.Sequelize.Op;
var _ = require("underscore");
var jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 12;
var txtprefix = "prefix";

exports.create = (req, res) => {
    const hashPassword = hashStrSync(req.body.password);
    const email = req.body.email;
    let body = {
        name: req.body.name,
        surname: req.body.surname,
        email: email,
        password: hashPassword,
        role_id: req.body.role_id
    }

    db.Customer.create(body).then(function (customer) {
        let customerId = customer.id;

        let body = _.pick(customer,
            "name",
            "surname",
            "email",
            "password",
            "role_id",
            "token");
        let attributes = {};

        const token = jwt.sign(
            {
                id: customerId,
                email: customer.email,
                role_id: customer.role_id
            },
            'secret_key',
            {
                expiresIn: "2h",
            }
        );
        if (body.hasOwnProperty("token")) {
            attributes.token = token;
        }

        // save user token

        return res.status(200).send({ message: 'success', token: token });
    }), function (e) {
        res.status(500).send();
    }

}

exports.findAll = (req, res) => {
    db.Customer.findAll().then(function (customer) {
        res.json(customer);
    })
}

exports.findOne = (req, res) => {
    let customerId = req.params.id;
    db.Customer.findOne({
        where: {
            id: customerId
        }
    }).then(function (customer) {

        res.json(customer);
    })

}

exports.update = (req, res) => {
    let customerId = req.params.id;

    let body = _.pick(req.body,
        "name",
        "surname",
        "email",
        "password",
        "appointmentDate",
        "appointmentTime",
        "employee_id");
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
    if (body.hasOwnProperty("appointmentDate")) {
        attributes.appointmentDate = body.appointmentDate;
    }
    if (body.hasOwnProperty("appointmentTime")) {
        attributes.appointmentTime = body.appointmentTime;
    }
    if (body.hasOwnProperty("employee_id")) {
        attributes.employee_id = body.employee_id;
    }
    db.Customer.findOne({
        where: {
            id: customerId
        }
    }).then(function (customer) {
        if (customer) {
            customer.update(attributes).then(function (customer) {
                res.json(customer.toJSON());
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
    let customerId = req.params.id;
    db.Customer.destroy({
        where: {
            id: customerId
        }
    }).then(function (customerDeleted) {
        if (customerDeleted === 0) {
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


function hashStrSync(txtOrg) {
    return bcrypt.hashSync(`${txtprefix}${txtOrg}`, saltRounds);

}
function compareStrSync(txtOrg, txtHashed) {
    return bcrypt.compareSync(`${txtprefix}${txtOrg}`, txtHashed);
}