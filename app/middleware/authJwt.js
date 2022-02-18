// const config = require("../config/auth.config.js");
const db = require("../models");
const Employee = db.Employee;


const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.Employee = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;



















// verifyToken = (req, res, next) => {
//     let token = req.headers["x-access-token"];
//     console.log(token);
//     if (!token) {
//       return res.status(403).send({
//         message: "No token provided!"
//       });
//     }
//     jwt.verify(token, config.secret, (err, decoded) => {
//         if (err) {
//           return res.status(401).send({
//             message: "Unauthorized!"
//           });
//         }
//         req.userId = decoded.id;
//         next();
//       });
//     };
//     isManager = (req, res, next) => {
//         let pk=req.params.id;
//         Employee.findOne({
//             where:{
//                 id:pk
//             }
//         }).then(user => {
//           user.getRoles().then(roles => {
//             for (let i = 0; i < roles.length; i++) {
//               if (roles[i].name === "manager") {
//                 next();
//                 return;
//               }
//             }
//             res.status(403).send({
//               message: "Require Manager Role!"
//             });
//             return;
//           });
//         });
//       };
//       isEmployee = (req, res, next) => {
//           let pk=req.params.id;
//         Employee.findOne({
//             where:{
//                 id:pk
//             }
//         }).then(user => {
//           user.getRoles().then(roles => {
//             for (let i = 0; i < roles.length; i++) {
//               if (roles[i].name === "employee") {
//                 next();
//               }
//             }
//             res.status(403).send({
//               message: "Require Employee Role!"
//             });
//           });
//         });
//       };
//       isEmployeeOrManager = (req, res, next) => {
//         Employee.findByPk(req.params.id).then(user => {
//           user.getRoles().then(roles => {
//             for (let i = 0; i < roles.length; i++) {
//               if (roles[i].name === "employee") {
//                 next();
//                 return;
//               }
//               if (roles[i].name === "manager") {
//                 next();
//                 return;
//               }
//             }
//             res.status(403).send({
//               message: "Require Moderator or Admin Role!"
//             });
//           });
//         });
//       };

//       const authJwt = {
//         verifyToken: verifyToken,
//         isManager: isManager,
//         isEmployee: isEmployee,
//         isEmployeeOrAdmin: isEmployeeOrManager
//       };
//       module.exports = authJwt;