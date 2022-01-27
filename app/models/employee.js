
const department = require("./department");

module.exports =(sequelize, Sequelize)=> {
    const Employees= sequelize.define('employee', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [1.250]
            }
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [1.250]
            }
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                len:[1.250]
            }
        },
        password:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                len:[6.11]
            }
        },
        department_id : {
            type: Sequelize.INTEGER,
            references:{
                model:{
                    tableName:"departments",
                   
                },
                key:'id'
            }
        },
        role_id : {
            type: Sequelize.INTEGER,
            references:{
                model:{
                    tableName:"roles",
                   
                },
                key:'id'
            }
        }
       
      
    });
    return Employees;
 
}
