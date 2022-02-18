module.exports =(sequelize,Sequelize)=> {
    let customer_employee= sequelize.define('customer_employee', {
        customer_id : {
            type: Sequelize.INTEGER,
            primaryKey : true ,
            references:{
                model:{
                    tableName:"customers",
                   
                },
                key:'id'
            }
        },
        employee_time_id : {
            type: Sequelize.INTEGER,
            primaryKey : true ,
            references:{
                model:{
                    tableName:"employee_times",
                   
                },
                key:'id'
            }
        }
    });
    return customer_employee;
}
