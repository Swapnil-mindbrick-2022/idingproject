const CsvParser = require("json2csv").Parser;
const db=require('../../models')
const Uploadhistory = db.uploadhistory;
const IVRS = db.ivrs;
const Himachal = db.ivrsHimachal
const Karnataka = db.KarnatakaIvrs
const Kerla = db.KerlaIvrs
const Up = db.UpIvrs
const Tutorial = db.tutorials;
const Sequelize = require("sequelize");
const Op = db.Sequelize.Op;

const readXlsxFile = require("read-excel-file/node");

const excel = require("exceljs")
// const { response } = require("express");
const fs = require("fs");
const reader = require('xlsx')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 */

 const uploadivrs = async (req, res, next) => {
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
   if (req.body.ivrsstate == "Gujarat"){
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
            id: res.id,
            GENDER: res.GENDER || null,
            mobile: res.mobile || res.Mobile||null,
            Response: res. Response || null,
            UploadDate: req.body.date||null,
            // question:req.body.question||null
          }
          if (data.length < 25000){
            data.push(cust);
          }else if (data2.length < 25000){
            data2.push(cust)

          }else if(data3.length < 25000) {
            data3.push(cust)
          }else if(data4.length<25000){
            data4.push(cust)
          }else if(data5.length<25000){
            data5.push(cust)
          }else if(data6.length<25000){
            data6.push(cust)
          }else if(data7.length<25000){
            data7.push(cust)
          }else if(data8.length<25000){
            data8.push(cust)
          }else if(data9.length<25000){
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
       uploadResults= await IVRS.bulkCreate(data,{
        fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false,
        // logging: false
        // returning: true

       }).then(
        uploadResults= await IVRS.bulkCreate(data2,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await IVRS.bulkCreate(data3,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await IVRS.bulkCreate(data4,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await IVRS.bulkCreate(data5,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await IVRS.bulkCreate(data6,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await IVRS.bulkCreate(data7,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await IVRS.bulkCreate(data8,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
  
         })
       ).then(
        uploadResults= await IVRS.bulkCreate(data9,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await IVRS.bulkCreate(data10,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
  
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
          filename:file.originalname +'(ivrs)',
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

} else if (req.body.ivrsstate == "Himachal"){
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
            id: res.id,
            GENDER: res.GENDER || null,
            mobile: res.mobile || res.Mobile||null,
            Response: res.Response || res.Responses||null,
            UploadDate: req.body.date||null,
            // question:req.body.question||null
          }
          if (data.length < 25000){
            data.push(cust);
          }else if (data2.length < 25000){
            data2.push(cust)

          }else if(data3.length < 25000) {
            data3.push(cust)
          }else if(data4.length<25000){
            data4.push(cust)
          }else if(data5.length<25000){
            data5.push(cust)
          }else if(data6.length<25000){
            data6.push(cust)
          }else if(data7.length<25000){
            data7.push(cust)
          }else if(data8.length<25000){
            data8.push(cust)
          }else if(data9.length<25000){
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
       uploadResults= await Himachal.bulkCreate(data,{
        fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false,
        // logging: false
        // returning: true

       }).then(
        uploadResults= await Himachal.bulkCreate(data2,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Himachal.bulkCreate(data3,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Himachal.bulkCreate(data4,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Himachal.bulkCreate(data5,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Himachal.bulkCreate(data6,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Himachal.bulkCreate(data7,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Himachal.bulkCreate(data8,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
  
         })
       ).then(
        uploadResults= await Himachal.bulkCreate(data9,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Himachal.bulkCreate(data10,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
  
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
          filename:file.originalname +'(ivrs)',
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

}else if (req.body.ivrsstate == "Karnataka"){
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
            id: res.id,
            GENDER: res.GENDER || null,
            mobile: res.mobile || res.Mobile||null,
            Response: res.Response || res.Responses||null,
            UploadDate: req.body.date||null,
            // question:req.body.question||null
          }
          if (data.length < 25000){
            data.push(cust);
          }else if (data2.length < 25000){
            data2.push(cust)

          }else if(data3.length < 25000) {
            data3.push(cust)
          }else if(data4.length<25000){
            data4.push(cust)
          }else if(data5.length<25000){
            data5.push(cust)
          }else if(data6.length<25000){
            data6.push(cust)
          }else if(data7.length<25000){
            data7.push(cust)
          }else if(data8.length<25000){
            data8.push(cust)
          }else if(data9.length<25000){
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
        fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false,
        // logging: false
        // returning: true

       }).then(
        uploadResults= await Karnataka.bulkCreate(data2,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Karnataka.bulkCreate(data3,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Karnataka.bulkCreate(data4,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Karnataka.bulkCreate(data5,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Karnataka.bulkCreate(data6,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Karnataka.bulkCreate(data7,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Karnataka.bulkCreate(data8,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
  
         })
       ).then(
        uploadResults= await Karnataka.bulkCreate(data9,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Karnataka.bulkCreate(data10,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
  
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
          filename:file.originalname +'(ivrs)',
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
else if (req.body.ivrsstate == "Kerla"){
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
            id: res.id,
            GENDER: res.GENDER || null,
            mobile: res.mobile || res.Mobile||null,
            Response: res.Response || res.Responses||null,
            UploadDate: req.body.date||null,
            // question:req.body.question||null
          }
          if (data.length < 25000){
            data.push(cust);
          }else if (data2.length < 25000){
            data2.push(cust)

          }else if(data3.length < 25000) {
            data3.push(cust)
          }else if(data4.length<25000){
            data4.push(cust)
          }else if(data5.length<25000){
            data5.push(cust)
          }else if(data6.length<25000){
            data6.push(cust)
          }else if(data7.length<25000){
            data7.push(cust)
          }else if(data8.length<25000){
            data8.push(cust)
          }else if(data9.length<25000){
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
        fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false,
        // logging: false
        // returning: true

       }).then(
        uploadResults= await Kerla.bulkCreate(data2,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Kerla.bulkCreate(data3,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Kerla.bulkCreate(data4,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Kerla.bulkCreate(data5,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Kerla.bulkCreate(data6,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Kerla.bulkCreate(data7,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Kerla.bulkCreate(data8,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
  
         })
       ).then(
        uploadResults= await Kerla.bulkCreate(data9,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Kerla.bulkCreate(data10,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
  
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
          filename:file.originalname +'(ivrs)',
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
else if (req.body.ivrsstate == "UttarPradesh"){
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
            id: res.id,
            GENDER: res.GENDER || null,
            mobile: res.mobile || res.Mobile||null,
            Response: res.Response || res.Responses||null,
            UploadDate: req.body.date||null,
            // question:req.body.question||null
          }
          if (data.length < 25000){
            data.push(cust);
          }else if (data2.length < 25000){
            data2.push(cust)

          }else if(data3.length < 25000) {
            data3.push(cust)
          }else if(data4.length<25000){
            data4.push(cust)
          }else if(data5.length<25000){
            data5.push(cust)
          }else if(data6.length<25000){
            data6.push(cust)
          }else if(data7.length<25000){
            data7.push(cust)
          }else if(data8.length<25000){
            data8.push(cust)
          }else if(data9.length<25000){
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
        fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false,
        // logging: false
        // returning: true

       }).then(
        uploadResults= await Up.bulkCreate(data2,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Up.bulkCreate(data3,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Up.bulkCreate(data4,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Up.bulkCreate(data5,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Up.bulkCreate(data6,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Up.bulkCreate(data7,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Up.bulkCreate(data8,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
  
         })
       ).then(
        uploadResults= await Up.bulkCreate(data9,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
          // logging: false
          // returning: true
  
         })
       ).then(
        uploadResults= await Up.bulkCreate(data10,{
          fields:['id','mobile','Response','UploadDate','question'],
        raw:true,
        benchmark:true, 
        returning:false
  
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
          filename:file.originalname +'(ivrs)',
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

}return res.json(message)

}
























const downloadmap = async (req, res) => {
  const data = await Tutorial.findAll({
      distinct: true,
		  subQuery: false,
    where :{[Sequelize.Op.and]:[ {AC_Name:req.query.AC_Name},{GENDER:req.query.GENDER}]},
    include: [{
      model: IVRS,
      eager:true,
      where :{[Sequelize.Op.and]:[{Response:req.query.Response},{UploadDate:req.query.UploadDate}]}
    }]
  
  }).then((objs) => {
    let tutorials = [];
;
    objs.forEach(obj => {
      // for (const IVRS_RESPONSEs in obj) {
        obj.IVRS_RESPONSEs.forEach(data => {

        tutorials.push({
        userID: obj.userID,
        GENDER: obj.GENDER,
        mobile: obj.mobile,
        Name: obj.Name,
        Pincode: obj.Pincode,
ivrsstate: obj.state || obj.State,
        AC_Number: obj.AC_Number,
        AC_Name: obj.AC_Name,
        Response:data.Response,
        UploadDate:data.UploadDate,
        question:data.question
            


        })
          // console.log(tutorials)



          

          // do something with innerArrayElement
        });
      // }
    })

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
      { header: "Response", key: "Response", width: 10 },
      { header: "UploadDate", key: "UploadDate", width: 10 },
      { header: "question", key: "question", width: 10 },

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






module.exports = {
  uploadivrs,
  downloadmap

};