const express=require('express');
const bodyParser=require("body-parser");
var _ = require("underscore");
const cors=require("cors");
const db = require("./app/models");
const Role = db.Role;
const app=express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
       res.sendStatus(200);
     }
     else {
       next();
     }});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));


db.sequelize.sync();
const PORT=process.env.PORT || 8080;
db.sequelize.sync().then(function () {

    console.log("database connection is okay");
    app.listen(PORT, function () {
        console.log("Express listening on " + PORT + "!");
    });

})

// app.get("/",)
require("dotenv").config();
require("./app/routes/roleRoutes")(app);
require("./app/routes/departmentRoutes")(app);
 require("./app/routes/employeeRoutes")(app);
 require("./app/routes/customerRoutes")(app);
require('./app/routes/authRoutes')(app);
require('./app/routes/dateRoutes')(app);
require('./app/routes/timeRoutes')(app);
// require('./app/routes/user.routes')(app);
// app.listen(PORT,()=>{
//      console.log("server is running"+ PORT +"!!");
//  })

   //  var corsOptions={
    
//      origin:"http://localhost:8080",
    
//  };
//  app.use(cors(corsOptions));