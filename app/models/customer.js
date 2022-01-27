module.exports =(sequelize,Sequelize)=> {
    let Customer= sequelize.define('customer', {
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
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [1.250]
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [1.250]
            }
        },
        appointmentDate:{
            type:Sequelize.DATEONLY,
            allowNull:false,
           
        },
        appointmentTime:{
            type:Sequelize.TIME,
            allowNull:false,
           
        },
        employee_id : {
            type: Sequelize.INTEGER,
            references:{
                model:{
                    tableName:"employees",
                   
                },
                key:'id'
            }
        }
       
    });

   
    return Customer;
}