const Sequelize = require('sequelize');
const sequelize = require('../database')
const ivrs = require('./ivrs.model')
  const Tutorial = sequelize.define("data",{
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true

    },
    GENDER: {
      type: Sequelize.STRING
    },
    mobile:{
      type: Sequelize.STRING,
      // unique: true,
      // primaryKey:true
     
    },
    Name: {
      type: Sequelize.STRING
    },
    Pincode:{
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    AC_Number:{
      type: Sequelize.STRING
    },
    AC_Name:{
      type: Sequelize.STRING
    },
     
  })

 
  // Tutorial.hasOne(ivrs, {
  //   foreignKey: 'mobile_id',
  //   as: 'ivrs'
  
  
// })



module.exports = Tutorial



