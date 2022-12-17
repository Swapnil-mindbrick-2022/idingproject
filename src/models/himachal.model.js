const Sequelize = require('sequelize')
// const sequelize = require('../database')
// const ivrs = require('./ivrs.model')
module.exports = (sequelize, Sequelize) => {
  const himachal = sequelize.define("himachalvotersdata",{
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
      unique: true,
      primaryKey:true,
      // ignoreDuplicates:true
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
    AGE:{
      type: Sequelize.STRING
    }
  }, {
    timestamps: false
  })
  return himachal

}
