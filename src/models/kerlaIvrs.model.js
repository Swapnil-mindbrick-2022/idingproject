// const tutorials = require('./tutorial.model')
const Sequelize = require('sequelize')
module.exports = (sequelize, Sequelize) => {
  
    const KerlaIvrs = sequelize.define("kerlaIvrs",{  
      id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true

      },  
       mobile:{
        type: Sequelize.STRING,
        // unique: true,
        primaryKey:true,
      },
      Response: {
        type: Sequelize.STRING
      },

      UploadDate:{

        type: Sequelize.STRING
      },
     
      
      // Response2: {
      //   type: Sequelize.STRING
      // },  
}, {
  timestamps: false
})

return KerlaIvrs


}