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
        role_id : {
            type: Sequelize.INTEGER,
            references:{
                model:{
                    tableName:"roles",
                   
                },
                key:'id'
            }
        },
       
    } ,{
        timestamps: false,
        createdAt: false,
        updatedAt:false
    });

   
    return Customer;
}