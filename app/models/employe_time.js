module.exports =(sequelize,Sequelize)=> {
    let employe_time= sequelize.define('employee_time', {
        employee_id : {
            type: Sequelize.INTEGER,
            primaryKey : true ,
            references:{
                model:{
                    tableName:"employees",
                   
                },
                key:'id'
            }
        },
        time_id : {
            type: Sequelize.INTEGER,
            primaryKey : true ,
            references:{
                model:{
                    tableName:"times",
                   
                },
                key:'id'
            }
        }
    });
    return employe_time;
}
