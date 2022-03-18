const db = require("../models");
const config = require("../config/auth.config");
const Employee = db.Employee;
const Role = db.Role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { json } = require("body-parser");
const saltRounds = 12;
var txtprefix = "prefix";
var employeeCont = require("../controllers/employeeController")
var _ = require("underscore");
const role = require("../models/role");
require('dotenv').config();

exports.signup = (req, res) => {
  const hashPassword = hashStrSync(req.body.password);
  const email = req.body.email;
  let body = {
    name: req.body.name,
    surname: req.body.surname,
    email: email,
    password: hashPassword,
    department_id: req.body.department_id,
    role_id: req.body.role_id

  }

  db.Employee.create(body).then(function (employee) {
    let employeeId = employee.id;

    let body = _.pick(employee,
      "name",
      "surname",
      "email",
      "password",
      "department_id",
      "role_id",
      "token");
    let attributes = {};

    const token = jwt.sign(
      {
        id: employeeId,
        email: employee.email,
        role_id: employee.role_id
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


exports.signin = (req, res) => {
  console.log("in sign in")
  const email= Buffer.from(req.body.email);
  const check_email=email.includes('@birtakim.com')
  console.log(check_email)
  if(check_email){
    db.Employee.findAll().then(function (employee) {
      if (employee) {
        let obj = employee.find(o => o.email === req.body.email);
        if (obj) {
          console.log(obj.id);
          if (!compareStrSync(req.body.password, obj.password)) {
            return res.json({ message: 'fail', token: '', Role: '' });
  
          } else {
  
            let body = _.pick(employee,
              "name",
              "surname",
              "email",
              "password",
              "department_id",
              "role_id",
              "token");
            let attributes = {};
  
            const token = jwt.sign(
              {
                id: obj.id,
                email: obj.email,
                role_id: obj.role_id
              },
  
              'secret_key',
              {
                expiresIn: "2h",
              }
            );
            if (body.hasOwnProperty("token")) {
              attributes.token = token;
            }
            if (body.hasOwnProperty("role_id")) {
              attributes.role_id = obj.role_id;
            }
            let role
            if (obj.role_id == 1) {
              role = "Manager";
            }
            else {
              role = "Employee";
            }
            // save user token
  
            return res.status(200).send({ message: 'success', token: token, Role: role ,Id:obj.id});
            res.status(200).json(obj);
  
            // token = jwt.sign({ "id": obj.id, "email": obj.email, "name": obj.name }, process.env.SECRET);
            // res.status(200).json({ token: token });
          }
        }
  
  
      }else{
        res.status(404).json({ error: "User does not exist" });
      } 
    })
  }
  else {
    db.Customer.findAll().then(function (customer) {

      if (customer) {
        let obj = customer.find(o => o.email === req.body.email);
        if (obj) {
          console.log(obj.id);
          if (!compareStrSync(req.body.password, obj.password)) {
            return res.json({ message: 'fail', token: '', Role: '' });

          } else {

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
                id: obj.id,
                email: obj.email,
                role_id: obj.role_id
              },

              'secret_key',
              {
                expiresIn: "2h",
              }
            );
            if (body.hasOwnProperty("token")) {
              attributes.token = token;
            }
            if (body.hasOwnProperty("role_id")) {
              attributes.role_id = obj.role_id;
            }
            let role
            if (obj.role_id == 1) {
              role = "Employee";
            }
            else if (obj.role_id == 2) {
              role = "Customer";
            }
            else {
              role = "Manager";
            }
            // save user token

            return res.status(200).send({ message: 'success', token: token, Role: role });
            res.status(200).json(obj);

            // token = jwt.sign({ "id": obj.id, "email": obj.email, "name": obj.name }, process.env.SECRET);
            // res.status(200).json({ token: token });
          }
        }

      } else {
        res.status(404).json({ error: "User does not exist" });
      }
    })

  }
}

function hashStrSync(txtOrg) {
  return bcrypt.hashSync(`${txtprefix}${txtOrg}`, saltRounds);

}
function compareStrSync(txtOrg, txtHashed) {
  return bcrypt.compareSync(`${txtprefix}${txtOrg}`, txtHashed);
}

