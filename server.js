const express=require('express');
const bodyParser=require("body-parser");
var _ = require("underscore");
const db = require("./app/models");
const Role = db.Role;
const app=express();

const cors = require('cors');
app.use(cors());


// const AdminJS = require('adminjs')
// const AdminJSExpress = require('@adminjs/express')
// const adminJs = new AdminJS({
//   databases: [],
//   rootPath: '/admin',
// })
// const router = AdminJSExpress.buildRouter(adminJs)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(adminJs.options.rootPath, router)
db.sequelize.sync();
const PORT=process.env.PORT || 8080;
db.sequelize.sync().then(function () {

    console.log("database connection is okay");
    app.listen(8080, () => console.log(' localhost:8080/admin'))

})




// app.get("/",)
require("dotenv").config();
require("./app/routes/roleRoutes")(app);
require("./app/routes/departmentRoutes")(app);
require("./app/routes/employeeRoutes")(app);
require("./app/routes/customerRoutes")(app);
require('./app/routes/authRoutes')(app);
require('./app/routes/appointmentRoutes')(app);
// require('./app/routes/user.routes')(app);
// app.listen(PORT,()=>{
//      console.log("server is running"+ PORT +"!!");
//  })

   //  var corsOptions={
    
//      origin:"http://localhost:8080",
    
//  };
//  app.use(cors(corsOptions));