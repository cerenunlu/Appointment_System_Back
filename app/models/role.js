module.exports =(sequelize,Sequelize)=> {
    let Role= sequelize.define('role', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [1.250]
            }
        }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt:false
    });

   
    return Role;
}
