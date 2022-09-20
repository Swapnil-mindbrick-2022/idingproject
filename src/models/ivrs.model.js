const tutorials = require('./tutorial.model')

// module.exports = (sequelize, Sequelize) => {
  const Sequelize = require('sequelize')
  const sequelize = require('../database')
    const IVRS = sequelize.define("IVRS_RESPONSE",{
    
  
  
      id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true

      },
       mobile:{
        type: Sequelize.STRING,
        // unique:true,
        // primaryKey:true
        
        
       
      },
      Response: {
        type: Sequelize.STRING
      },
     
      
      // Response2: {
      //   type: Sequelize.STRING
      // },
      
   
})
// IVRS.belongsTo(tutorials, {
//   foreignKey: 'mobile_id',
//   as: 'data'
// })





module.exports = IVRS

    
  
  
    