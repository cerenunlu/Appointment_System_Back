module.exports =(sequelize,Sequelize)=> {
    let Date= sequelize.define('Date', {
        id : {
            type :Sequelize.INTEGER ,
            primaryKey : true ,
            autoIncrement : true
        },
       date:{
           type:Sequelize.DATEONLY,
           allowNull:false,
       },
       dayName:{
           type:Sequelize.STRING,
           allowNull:false
       }
       
    });

   
    return Date;
}