module.exports =(sequelize,Sequelize)=> {
    let Department= sequelize.define('department', {
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

   
    return Department;
}
