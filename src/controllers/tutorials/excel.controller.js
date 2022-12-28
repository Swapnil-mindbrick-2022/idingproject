const Sequelize = require("sequelize");
const nodeify = require('nodeify');
const CsvParser = require("json2csv").Parser;
const db = require("../../models");
const Tutorial = db.tutorials;
const himachal = db.himachal;
const Karnataka = db.karnataka
const Kerla = db.Kerla
const westbengol = db.Westbengol 
const Up = db.Up
const IVRS = db.ivrs;
const Uploadhistory = db.uploadhistory;
// const XLSX = require("read-excel-file/node");
// const ivrs = require("../../models/ivrs.model");
// const excel = require('fast-xlsx-reader');
const reader = require('xlsx');





// for pagination
const Op = db.Sequelize.Op;


const excel = require("exceljs")
// const { response } = require("express");
const fs = require("fs");
const { raw } = require('body-parser');



const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;
    
      //  row is an array of row . 
      // each row is aray of an cells

    readXlsxFile(path).then((rows) => {
      

      // skip header
      rows.shift();
      let tutorials = [];
      // Parse Excel file to data objects--------
      rows.forEach((row) => {
        

        let tutorial = {
          userID: row[0],
          GENDER: row[1],
          mobile: row[2],
          Name: row[3],
          Pincode: row[4],
          state: row[5],
          AC_Number:row[6],
          AC_Name:row[7],

        }
        tutorials.push(tutorial);

      });
      
      Tutorial.bulkCreate(tutorials)
        .then(() => {
          fs.unlink(path, (err) => {
            if (err) {
                throw err;
            }
        
            console.log("File is deleted.");
        });
          // res.status(200).send({
          //   message: "Uploaded the file successfully: " + req.file.originalname,
          // });
          res.send(tutorials)
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 */

 const uploadmuliplefiles = async (req, res, next) => {

  const message =[];
  let data =[]
  let data2 = []
  let data3 = []
  let data4 = []
  let data5 = []
  let data6 = []
  let data7 = []
  let data8 = []
  let data9 = []
  let data10 = []
  if (req.body.state == "Gujarat"){

    for (let file of req.files) {
      try{
        let path =
        __basedir + "/resources/static/assets/uploads/" + file.filename;
  
        
  
        let rows = reader.read(path,{type:'file'})
  
        const sheetNames= rows.SheetNames
  
  
   
        let ivrsdata = sheetNames.length;
        
  
        for (let i = 0; i < ivrsdata; i++) {
          data = [],data2 =[],data3 =[],data4 =[],data5 = [],data6 = [],data7 = [],data8 = [],data9 = [],data10 =[]
          const arr= reader.utils.sheet_to_json(
            
  
            rows.Sheets[rows.SheetNames[0]]
  
          )
          arr.forEach((res)=>{
            let cust ={
              userID: res.userID,
              GENDER: res.GENDER || null,
              mobile: res.mobile || res.Mobile||null,
              Name: res.Name || null,
              Pincode: res.Pincode || null,
              state: res.state || res.State || null,
              AC_Number: res.AC_Number ||res.AC_No ||null,
              AC_Name: res.AC_Name || null
            }
            if (data.length < 70000){
              data.push(cust);
            }else if (data2.length < 70000){
              data2.push(cust)
  
            }else if(data3.length < 70000) {
              data3.push(cust)
            }else if(data4.length<70000){
              data4.push(cust)
            }else if(data5.length<70000){
              data5.push(cust)
            }else if(data6.length<70000){
              data6.push(cust)
            }else if(data7.length<70000){
              data7.push(cust)
            }else if(data8.length<70000){
              data8.push(cust)
            }else if(data9.length<70000){
              data9.push(cust)
  
            }else{
              data10.push(cust)
            }
         
          })
         }
         console.log(data.length)
         console.log(data2.length)
         console.log(data3.length)
         console.log(data4.length)
         console.log(data5.length)
         console.log(data6.length)
         console.log(data7.length)
         console.log(data8.length)
         console.log(data9.length)
         console.log(data10.length)
         uploadResults= await Tutorial.bulkCreate(data,{
          fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
          updateOnDuplicate: ["mobile"] ,
       
          // individualHooks: true,
          raw:true,
          benchmark:true,
          returning:false,
          // logging: false
          // returning: true
  
         }).then(
          uploadResults= await Tutorial.bulkCreate(data2,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Tutorial.bulkCreate(data3,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Tutorial.bulkCreate(data4,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Tutorial.bulkCreate(data5,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Tutorial.bulkCreate(data6,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Tutorial.bulkCreate(data7,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Tutorial.bulkCreate(data8,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Tutorial.bulkCreate(data9,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Tutorial.bulkCreate(data10,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         )
        .then(
          fs.unlink(path, (err) => {
          if (err) {
          throw err;
        }else{
          console.log("File is deleted.");
  
        }
  
    
  }))
  
        //  it will now wait for above promise to be fullfiled 
        // and show the proper details 
  
        if(!uploadResults){
          const result ={
            status:'fail',
            filename:file.originalname,
            message:'upload Failed'
          }
          message.push(result)
        }else{
          const myname = req.user.fullname
          const uploadhistory = new Uploadhistory({
            Name:myname,
            filename:file.originalname +'(data)',
            // uploadtime: date.now(),
          })
          await uploadhistory.save()
          const result ={
            status:'ok',
            filename:file.originalname,
            message:'file upload successfully'
          }
          message.push(result)
          console.log(result)
  
        }
  
  
      }catch(error){
        const result ={
          status:'fail',
          filename:file.originalname,
          message:"Error ->" + error.message
      }
  
      message.push(result)
      
    }
    }


  }else if (req.body.state == "Himachal"){
    for (let file of req.files) {
      try{
        let path =
        __basedir + "/resources/static/assets/uploads/" + file.filename;
  
        
  
        let rows = reader.read(path,{type:'file'})
  
        const sheetNames= rows.SheetNames
  
  
   
        let ivrsdata = sheetNames.length;
        
  
        for (let i = 0; i < ivrsdata; i++) {
          data = [],data2 =[],data3 =[],data4 =[],data5 = [],data6 = [],data7 = [],data8 = [],data9 = [],data10 =[]
          const arr= reader.utils.sheet_to_json(
            
  
            rows.Sheets[rows.SheetNames[0]]
  
          )
          arr.forEach((res)=>{
            let cust ={
            userID: res.userID,
              GENDER: res.GENDER || null,
              mobile: res.mobile || res.Mobile||res.MOBILE||null,
              Name: res.Name ||res.NAME||null,
              Pincode: res.Pincode ||res.PINCODE|| null,
              state: res.state || res.State ||res.STATE|| null,
              AC_Number: res.AC_Number ||res.AC_No||res.AC_NO ||null,
              AC_Name: res.AC_Name ||res.AC_NAME|| null,
              AGE:res.AGE || null
            }
            if (data.length < 70000){
              data.push(cust);
            }else if (data2.length < 70000){
              data2.push(cust)
  
            }else if(data3.length < 70000) {
              data3.push(cust)
            }else if(data4.length<70000){
              data4.push(cust)
            }else if(data5.length<70000){
              data5.push(cust)
            }else if(data6.length<70000){
              data6.push(cust)
            }else if(data7.length<70000){
              data7.push(cust)
            }else if(data8.length<70000){
              data8.push(cust)
            }else if(data9.length<70000){
              data9.push(cust)
  
            }else{
              data10.push(cust)
            }
         
          })
         }
         console.log(data.length)
         console.log(data2.length)
         console.log(data3.length)
         console.log(data4.length)
         console.log(data5.length)
         console.log(data6.length)
         console.log(data7.length)
         console.log(data8.length)
         console.log(data9.length)
         console.log(data10.length)
         uploadResults= await himachal.bulkCreate(data,{
          fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
          updateOnDuplicate: ["mobile"] ,
       
          // individualHooks: true,
          raw:true,
          benchmark:true,
          returning:false,
          // logging: false
          // returning: true
  
         }).then(
          uploadResults= await himachal.bulkCreate(data2,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await himachal.bulkCreate(data3,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await himachal.bulkCreate(data4,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await himachal.bulkCreate(data5,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await himachal.bulkCreate(data6,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await himachal.bulkCreate(data7,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await himachal.bulkCreate(data8,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await himachal.bulkCreate(data9,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await himachal.bulkCreate(data10,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         )
        .then(
          fs.unlink(path, (err) => {
          if (err) {
          throw err;
        }else{
          console.log("File is deleted.");
  
        }
  
    
  }))
  
        //  it will now wait for above promise to be fullfiled 
        // and show the proper details 
  
        if(!uploadResults){
          const result ={
            status:'fail',
            filename:file.originalname,
            message:'upload Failed'
          }
          message.push(result)
        }else{
          const myname = req.user.fullname
          const uploadhistory = new Uploadhistory({
            Name:myname,
            filename:file.originalname +'(data)',
            // uploadtime: date.now(),
          })
          await uploadhistory.save()
          const result ={
            status:'ok',
            filename:file.originalname,
            message:'file upload successfully'
          }
          message.push(result)
          console.log(result)
  
        }
  
  
      }catch(error){
        const result ={
          status:'fail',
          filename:file.originalname,
          message:"Error ->" + error.message
      }
  
      message.push(result)
      
    }
    }

  }else if (req.body.state == "Karnataka"){
    for (let file of req.files) {
      try{
        let path =
        __basedir + "/resources/static/assets/uploads/" + file.filename;
  
        
  
        let rows = reader.read(path,{type:'file'})
  
        const sheetNames= rows.SheetNames
  
  
   
        let ivrsdata = sheetNames.length;
        
  
        for (let i = 0; i < ivrsdata; i++) {
          data = [],data2 =[],data3 =[],data4 =[],data5 = [],data6 = [],data7 = [],data8 = [],data9 = [],data10 =[]
          const arr= reader.utils.sheet_to_json(
            
  
            rows.Sheets[rows.SheetNames[0]]
  
          )
          arr.forEach((res)=>{
            let cust ={
            userID: res.userID,
              GENDER: res.GENDER || null,
              mobile: res.mobile || res.Mobile||res.MOBILE||null,
              Name: res.Name ||res.NAME||null,
              Pincode: res.Pincode ||res.PINCODE|| null,
              state: res.state || res.State ||res.STATE|| null,
              AC_Number: res.AC_Number ||res.AC_No||res.ConstituencyNumber||null,
              AC_Name: res.AC_Name ||res.AC_NAME|| null,
              AGE:res.AGE || null
            }
            if (data.length < 70000){
              data.push(cust);
            }else if (data2.length < 70000){
              data2.push(cust)
  
            }else if(data3.length < 70000) {
              data3.push(cust)
            }else if(data4.length<70000){
              data4.push(cust)
            }else if(data5.length<70000){
              data5.push(cust)
            }else if(data6.length<70000){
              data6.push(cust)
            }else if(data7.length<70000){
              data7.push(cust)
            }else if(data8.length<70000){
              data8.push(cust)
            }else if(data9.length<70000){
              data9.push(cust)
  
            }else{
              data10.push(cust)
            }
         
          })
         }
         console.log(data.length)
         console.log(data2.length)
         console.log(data3.length)
         console.log(data4.length)
         console.log(data5.length)
         console.log(data6.length)
         console.log(data7.length)
         console.log(data8.length)
         console.log(data9.length)
         console.log(data10.length)
         uploadResults= await Karnataka.bulkCreate(data,{
          fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
          updateOnDuplicate: ["mobile"] ,
       
          // individualHooks: true,
          raw:true,
          benchmark:true,
          returning:false,
          // logging: false
          // returning: true
  
         }).then(
          uploadResults= await Karnataka.bulkCreate(data2,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Karnataka.bulkCreate(data3,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Karnataka.bulkCreate(data4,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Karnataka.bulkCreate(data5,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Karnataka.bulkCreate(data6,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Karnataka.bulkCreate(data7,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Karnataka.bulkCreate(data8,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Karnataka.bulkCreate(data9,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Karnataka.bulkCreate(data10,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         )
        .then(
          fs.unlink(path, (err) => {
          if (err) {
          throw err;
        }else{
          console.log("File is deleted.");
  
        }
  
    
  }))
  
        //  it will now wait for above promise to be fullfiled 
        // and show the proper details 
  
        if(!uploadResults){
          const result ={
            status:'fail',
            filename:file.originalname,
            message:'upload Failed'
          }
          message.push(result)
        }else{
          const myname = req.user.fullname
          const uploadhistory = new Uploadhistory({
            Name:myname,
            filename:file.originalname +'(data)',
            // uploadtime: date.now(),
          })
          await uploadhistory.save()
          const result ={
            status:'ok',
            filename:file.originalname,
            message:'file upload successfully'
          }
          message.push(result)
          console.log(result)
  
        }
  
  
      }catch(error){
        const result ={
          status:'fail',
          filename:file.originalname,
          message:"Error ->" + error.message
      }
  
      message.push(result)
      
    }
    }

  }else if (req.body.state == "Kerla"){
    for (let file of req.files) {
      try{
        let path =
        __basedir + "/resources/static/assets/uploads/" + file.filename;
  
        
  
        let rows = reader.read(path,{type:'file'})
  
        const sheetNames= rows.SheetNames
  
  
   
        let ivrsdata = sheetNames.length;
        
  
        for (let i = 0; i < ivrsdata; i++) {
          data = [],data2 =[],data3 =[],data4 =[],data5 = [],data6 = [],data7 = [],data8 = [],data9 = [],data10 =[]
          const arr= reader.utils.sheet_to_json(
            
  
            rows.Sheets[rows.SheetNames[0]]
  
          )
          arr.forEach((res)=>{
            let cust ={
            userID: res.userID,
              GENDER: res.GENDER || null,
              mobile: res.mobile || res.Mobile||res.MOBILE||null,
              Name: res.Name ||res.NAME||null,
              Pincode: res.Pincode ||res.PINCODE|| null,
              state: res.state || res.State ||res.STATE|| null,
              AC_Number: res.AC_Number ||res.AC_No||res.AC_NO||null,
              AC_Name: res.AC_Name ||res.AC_NAME|| null,
              AGE:res.AGE || null,
              DOB:res.DOB ||null,
            }
            if (data.length < 70000){
              data.push(cust);
            }else if (data2.length < 70000){
              data2.push(cust)
  
            }else if(data3.length < 70000) {
              data3.push(cust)
            }else if(data4.length<70000){
              data4.push(cust)
            }else if(data5.length<70000){
              data5.push(cust)
            }else if(data6.length<70000){
              data6.push(cust)
            }else if(data7.length<70000){
              data7.push(cust)
            }else if(data8.length<70000){
              data8.push(cust)
            }else if(data9.length<70000){
              data9.push(cust)
  
            }else{
              data10.push(cust)
            }
         
          })
         }
         console.log(data.length)
         console.log(data2.length)
         console.log(data3.length)
         console.log(data4.length)
         console.log(data5.length)
         console.log(data6.length)
         console.log(data7.length)
         console.log(data8.length)
         console.log(data9.length)
         console.log(data10.length)
         uploadResults= await Kerla.bulkCreate(data,{
          fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
          updateOnDuplicate: ["mobile"] ,
       
          // individualHooks: true,
          raw:true,
          benchmark:true,
          returning:false,
          // logging: false
          // returning: true
  
         }).then(
          uploadResults= await Kerla.bulkCreate(data2,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Kerla.bulkCreate(data3,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Kerla.bulkCreate(data4,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Kerla.bulkCreate(data5,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Kerla.bulkCreate(data6,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Kerla.bulkCreate(data7,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Kerla.bulkCreate(data8,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Kerla.bulkCreate(data9,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Kerla.bulkCreate(data10,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         )
        .then(
          fs.unlink(path, (err) => {
          if (err) {
          throw err;
        }else{
          console.log("File is deleted.");
  
        }
  
    
  }))
  
        //  it will now wait for above promise to be fullfiled 
        // and show the proper details 
  
        if(!uploadResults){
          const result ={
            status:'fail',
            filename:file.originalname,
            message:'upload Failed'
          }
          message.push(result)
        }else{
          const myname = req.user.fullname
          const uploadhistory = new Uploadhistory({
            Name:myname,
            filename:file.originalname +'(data)',
            // uploadtime: date.now(),
          })
          await uploadhistory.save()
          const result ={
            status:'ok',
            filename:file.originalname,
            message:'file upload successfully'
          }
          message.push(result)
          console.log(result)
  
        }
  
  
      }catch(error){
        const result ={
          status:'fail',
          filename:file.originalname,
          message:"Error ->" + error.message
      }
  
      message.push(result)
      
    }
    }

  }else if (req.body.state == "westbengol"){
    for (let file of req.files) {
      try{
        let path =
        __basedir + "/resources/static/assets/uploads/" + file.filename;
  
        
  
        let rows = reader.read(path,{type:'file'})
  
        const sheetNames= rows.SheetNames
  
  
   
        let ivrsdata = sheetNames.length;
        
  
        for (let i = 0; i < ivrsdata; i++) {
          data = [],data2 =[],data3 =[],data4 =[],data5 = [],data6 = [],data7 = [],data8 = [],data9 = [],data10 =[]
          const arr= reader.utils.sheet_to_json(
            
  
            rows.Sheets[rows.SheetNames[0]]
  
          )
          arr.forEach((res)=>{
            let cust ={
            userID: res.userID,
              GENDER: res.GENDER || null,
              mobile: res.mobile || res.Mobile||res.MOBILE||null,
              Name: res.Name ||res.NAME||null,
              Pincode: res.Pincode ||res.PINCODE|| null,
              state: res.state || res.State ||res.STATE|| null,
              AC_Number: res.AC_Number ||res.AC_No||res.AC_NO||null,
              AC_Name: res.AC_Name ||res.AC_NAME|| null,
              AGE:res.AGE || null,
              DOB:res.DOB ||null,
            }
            if (data.length < 70000){
              data.push(cust);
            }else if (data2.length < 70000){
              data2.push(cust)
  
            }else if(data3.length < 70000) {
              data3.push(cust)
            }else if(data4.length<70000){
              data4.push(cust)
            }else if(data5.length<70000){
              data5.push(cust)
            }else if(data6.length<70000){
              data6.push(cust)
            }else if(data7.length<70000){
              data7.push(cust)
            }else if(data8.length<70000){
              data8.push(cust)
            }else if(data9.length<70000){
              data9.push(cust)
  
            }else{
              data10.push(cust)
            }
         
          })
         }
         console.log(data.length)
         console.log(data2.length)
         console.log(data3.length)
         console.log(data4.length)
         console.log(data5.length)
         console.log(data6.length)
         console.log(data7.length)
         console.log(data8.length)
         console.log(data9.length)
         console.log(data10.length)
         uploadResults= await westbengol.bulkCreate(data,{
          fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
          updateOnDuplicate: ["mobile"] ,
       
          // individualHooks: true,
          raw:true,
          benchmark:true,
          returning:false,
          // logging: false
          // returning: true
  
         }).then(
          uploadResults= await westbengol.bulkCreate(data2,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await westbengol.bulkCreate(data3,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await westbengol.bulkCreate(data4,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await westbengol.bulkCreate(data5,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await westbengol.bulkCreate(data6,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await westbengol.bulkCreate(data7,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await westbengol.bulkCreate(data8,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await westbengol.bulkCreate(data9,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await westbengol.bulkCreate(data10,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         )
        .then(
          fs.unlink(path, (err) => {
          if (err) {
          throw err;
        }else{
          console.log("File is deleted.");
  
        }
  
    
  }))
  
        //  it will now wait for above promise to be fullfiled 
        // and show the proper details 
  
        if(!uploadResults){
          const result ={
            status:'fail',
            filename:file.originalname,
            message:'upload Failed'
          }
          message.push(result)
        }else{
          const myname = req.user.fullname
          const uploadhistory = new Uploadhistory({
            Name:myname,
            filename:file.originalname +'(data)',
            // uploadtime: date.now(),
          })
          await uploadhistory.save()
          const result ={
            status:'ok',
            filename:file.originalname,
            message:'file upload successfully'
          }
          message.push(result)
          console.log(result)
  
        }
  
  
      }catch(error){
        const result ={
          status:'fail',
          filename:file.originalname,
          message:"Error ->" + error.message
      }
  
      message.push(result)
      
    }
    }

  }else if (req.body.state == "UttarPradesh"){
    for (let file of req.files) {
      try{
        let path =
        __basedir + "/resources/static/assets/uploads/" + file.filename;
  
        
  
        let rows = reader.read(path,{type:'file'})
  
        const sheetNames= rows.SheetNames
  
  
   
        let ivrsdata = sheetNames.length;
        
  
        for (let i = 0; i < ivrsdata; i++) {
          data = [],data2 =[],data3 =[],data4 =[],data5 = [],data6 = [],data7 = [],data8 = [],data9 = [],data10 =[]
          const arr= reader.utils.sheet_to_json(
            
  
            rows.Sheets[rows.SheetNames[0]]
  
          )
          arr.forEach((res)=>{
            let cust ={
            userID: res.userID,
              GENDER: res.GENDER || null,
              mobile: res.mobile || res.Mobile||res.MOBILE||null,
              Name: res.Name ||res.NAME||null,
              Pincode: res.Pincode ||res.PINCODE|| null,
              state: res.state || res.State ||res.STATE|| null,
              AC_Number: res.AC_Number ||res.AC_No||res.AC_NO||null,
              AC_Name: res.AC_Name ||res.AC_NAME|| null,
              AGE:res.AGE || null,
              DOB:res.DOB ||null,
            }
            if (data.length < 70000){
              data.push(cust);
            }else if (data2.length < 70000){
              data2.push(cust)
  
            }else if(data3.length < 70000) {
              data3.push(cust)
            }else if(data4.length<70000){
              data4.push(cust)
            }else if(data5.length<70000){
              data5.push(cust)
            }else if(data6.length<70000){
              data6.push(cust)
            }else if(data7.length<70000){
              data7.push(cust)
            }else if(data8.length<70000){
              data8.push(cust)
            }else if(data9.length<70000){
              data9.push(cust)
  
            }else{
              data10.push(cust)
            }
         
          })
         }
         console.log(data.length)
         console.log(data2.length)
         console.log(data3.length)
         console.log(data4.length)
         console.log(data5.length)
         console.log(data6.length)
         console.log(data7.length)
         console.log(data8.length)
         console.log(data9.length)
         console.log(data10.length)
         uploadResults= await Up.bulkCreate(data,{
          fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
          updateOnDuplicate: ["mobile"] ,
       
          // individualHooks: true,
          raw:true,
          benchmark:true,
          returning:false,
          // logging: false
          // returning: true
  
         }).then(
          uploadResults= await Up.bulkCreate(data2,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Up.bulkCreate(data3,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Up.bulkCreate(data4,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Up.bulkCreate(data5,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Up.bulkCreate(data6,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Up.bulkCreate(data7,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Up.bulkCreate(data8,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Up.bulkCreate(data9,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         ).then(
          uploadResults= await Up.bulkCreate(data10,{
            fields:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name','AGE'],
            updateOnDuplicate: ["mobile"] ,
         
            // individualHooks: true,
            raw:true,
            benchmark:true,
            returning:false,
            // logging: false
            // returning: true
    
           })
         )
        .then(
          fs.unlink(path, (err) => {
          if (err) {
          throw err;
        }else{
          console.log("File is deleted.");
  
        }
  
    
  }))
  
        //  it will now wait for above promise to be fullfiled 
        // and show the proper details 
  
        if(!uploadResults){
          const result ={
            status:'fail',
            filename:file.originalname,
            message:'upload Failed'
          }
          message.push(result)
        }else{
          const myname = req.user.fullname
          const uploadhistory = new Uploadhistory({
            Name:myname,
            filename:file.originalname +'(data)',
            // uploadtime: date.now(),
          })
          await uploadhistory.save()
          const result ={
            status:'ok',
            filename:file.originalname,
            message:'file upload successfully'
          }
          message.push(result)
          console.log(result)
  
        }
  
  
      }catch(error){
        const result ={
          status:'fail',
          filename:file.originalname,
          message:"Error ->" + error.message
      }
  
      message.push(result)
      
    }
    }

  }
  
  

  return res.json(message)

}
// const getTutorials = async (req, res) => {
//   // let data = {
//   //   data : "RAW QUERY"
//   // }
//   let data = await Tutorial.findAll({
//     // attributes:["GENDER","mobile",],
//     include:[{
//       model:IVRS,
//       attributes:['Response']
//     }],

//     // where:{mobile:9586103424}
//   })
//   // res.status(200).json(data)
//   console.log(data)
//   res.render('alldata.ejs',{'data': data});
  
// };

//  find IVRS 


// const download = (req, res) => {
//   Tutorial.findAll().then((objs) => {
//     let tutorials = [];
//     objs.forEach((obj) => {
//       const { userID, GENDER,mobile,Name,Pincode,state,AC_Number,AC_Name  } = obj;
//       tutorials.push({  userID, GENDER,mobile,Name,Pincode,state,AC_Number,AC_Name   });
//     });
//     const csvFields = ["userID", "GENDER", "mobile", "Name", "Pincode", "state", "AC_Number", "AC_Name"];
//     const csvParser = new CsvParser({ csvFields });
//     const csvData = csvParser.parse(tutorials);
//     res.setHeader("Content-Type", "text/csv");
//     res.setHeader("Content-Disposition", "attachment; filename=tutorials.csv");
//     res.status(200).end(csvData);
//   });
// };
// const update= (req, res) => {

// }
const download = (req, res) => {
  Tutorial.findAll({where :{[Sequelize.Op.and]:[ {AC_Name:req.query.AC_Name},{GENDER:req.query.GENDER}]}}).then((objs) => {
    let tutorials = [];

    objs.forEach((obj) => {
      tutorials.push({
        userID: obj.userID,
        GENDER: obj.GENDER,
        mobile: obj.mobile,
        Name: obj.Name,
        Pincode: obj.Pincode,
        state: obj.state || obj.State,
        AC_Number: obj.AC_Number,
        AC_Name: obj.AC_Name
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Tutorials");

    worksheet.columns = [
      { header: "Id", key: "id", width: 5 },
      { header: "GENDER", key: "GENDER", width: 10 },
      { header: "mobile", key: "mobile", width: 15 },
      { header: "Name", key: "Name", width: 25 },
      { header: "Pincode", key: "Pincode", width: 10 },
      { header: "state", key: "state", width: 10 },
      { header: "AC_Number", key: "AC_Number", width: 10 },
      { header: "AC_Name", key: "AC_Name", width: 10 },

    ];

    // Add Array Rows
    worksheet.addRows(tutorials)
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "MBDATA.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
}

// const getPagination = (page, size) => {
//   const limit = size
  
//   const offset = page ? page * limit : 50;

//   return { limit, offset };
// };

// const getPagingData = (data, page, limit) => {
//   const { count: totalItems, rows: tutorials } = data;
//   const currentPage = page ? +page : 1;
//   const totalPages = Math.ceil(totalItems / limit);

//   return { totalItems, tutorials, totalPages, currentPage };
// };
// const findAll = async(req, res) => {





//   const pageAsNumber = Number.parseInt(req.query.page);
//   const sizeAsNumber = Number.parseInt(req.query.size);


  

//   let page = 0;
//   if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
//     page = pageAsNumber;
//   }

//   let size = 50;

//   if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)){
//     size = sizeAsNumber;
//   }
 
//   // let search = {};
//   // let order = [];



//     // const searchtype = 'AC_Name'
//     const query = 'Abdasa'
//     const data =  await Tutorial.findAndCountAll({ 
//       // where:{
//       //   AC_Name:Sequelize.col('data.Abdasa')
//       // },
//       distinct: true,
// 		  subQuery: false,
//       limit:size,
//       offset: page * size,
      
//        attributes:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name'],
//     include:[{
//       model:IVRS,
//       attributes:['Response'],
//       required:true,

     
//     }],
//     where:{
//       mobile:Sequelize.col('data.mobile')
 
     
//     }


//     })


     
//    let uniquedates;
//    IVRS.findAll().then((obj)=>{
//     const dates= obj.map((date)=>{
//       return date.UploadDate,date.question
//     })

//     uniquedates = [...new Set(dates)]
//     console.log(uniquedates)
//     // console.log(data.count)
//     // res.send(data)
//     res.render('alldata',{'data':data.rows,
//       content: data.rows,
//       current:  page,
//       limit:size,

//       Pages:JSON.stringify( Math.ceil(data.count / Number.parseInt(size))),'dates':uniquedates
//     });


//   })
// };

  






module.exports = {
  upload,
  // getTutorials,
  download,
  uploadmuliplefiles,
  // findAll,
  // findbyany
};

