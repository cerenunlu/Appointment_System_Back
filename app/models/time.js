const department = require("./date");

module.exports =(sequelize, Sequelize)=> {
    const Time= sequelize.define('time', {
        id : {
            type :Sequelize.INTEGER ,
            primaryKey : true ,
            autoIncrement : true
        },
        hour:{
            type:Sequelize.TIME,
            allowNull:false
        },
        available:{
               type:Sequelize.BOOLEAN,
               allowNull:false,

        },
        date_id : {
            type: Sequelize.INTEGER,
            references:{
                model:{
                    tableName:"Dates",
                   
                },
                key:'id'
            }
        },
        employee_id : {
            type: Sequelize.INTEGER,
            references:{
                model:{
                    tableName:"employees",
                   
                },
                key:'id'
            }
        },
      
    });
    return Time;
 
}