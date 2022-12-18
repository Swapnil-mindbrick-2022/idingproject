const CsvParser = require("json2csv").Parser;
const db=require('../../models')

const Himachal = db.himachal

const Sequelize = require("sequelize");
const Op = db.Sequelize.Op;



const excel = require("exceljs")
// const { response } = require("express");
const fs = require("fs");



const himachalAllData = async (req,res)=>{
    

    const himachaldata= await Himachal.findAll({
        where:{
            AC_Name :'HIM 1'
        }
    });
    
    const dropdown = documet.createElement('select')
    
    
    himachaldata.forEach((user)=>{
        const option = documet.createElement('option');
        option.value = user.AC_Name,
        option.label= user.AC_Number
        dropdown.add(option)
    
    })
   documet.body.appendChild( dropdown)


   res.render('filterdata',{'user':user})

  




}


module.exports = {
 
    himachalAllData
  };
  
  