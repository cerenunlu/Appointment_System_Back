const express=require('express');
const bodyParser=require("body-parser");
var _ = require("underscore");
const cors=require("cors");

const app=express();

var corsOptions={
    origin:"http://localhost:8080"
};


app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

const db=require("./app/models");

db.sequelize.sync();
const PORT=process.env.PORT || 8080;
db.sequelize.sync().then(function () {

    console.log("database connection is okay");
    app.listen(PORT, function () {
        console.log("Express listening on " + PORT + "!");
    });

})


// app.get("/",)

require("./app/routes/roleRoutes")(app);
require("./app/routes/departmentRoutes")(app);
require("./app/routes/employeeRoutes")(app);
require("./app/routes/customerRoutes")(app);


// app.listen(PORT,()=>{
//     console.log("server is running"+ PORT +"!!");
// })