// const tutorials = require('./tutorial.model')
const Sequelize = require('sequelize')
module.exports = (sequelize, Sequelize) => {
  
    const IVRS = sequelize.define("gujrativrs",{
    
  
  
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
     
      // question:{
      //   type:Sequelize.STRING

      // },

      UploadDate:{

        type: Sequelize.STRING
      },

      
        
      
     
      
      // Response2: {
      //   type: Sequelize.STRING
      // },
      
   
}, {
  timestamps: false
})


return IVRS


}


    
  
  
    