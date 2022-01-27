const dbConfig=require("../config/db.config");

const Sequelize=require("sequelize");
const sequelize=new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

}
);

const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;

//routes 

// db.customer=require("./customer")(sequelize, Sequelize);

db.Role=require("./role")(sequelize, Sequelize);
db.Department=require("./department")(sequelize, Sequelize);
db.Employee=require("./employee")(sequelize, Sequelize);
db.Customer=require("./customer")(sequelize, Sequelize);

module.exports=db;