module.exports =(sequelize,Sequelize)=> {
    let appointment= sequelize.define('appointment', {
       
        date : {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        time:{
            type:Sequelize.STRING,
            allowNull:false
        },
        customer_id : {
            type: Sequelize.INTEGER,
            references:{
                model:{
                    tableName:"customers",
                   
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


    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt:false
    });
    return appointment;
}