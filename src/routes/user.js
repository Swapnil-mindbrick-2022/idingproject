const passport = require("passport");
const userauth=require('../middlewares/Auth/userauth')
// const { urlencoded } = require("body-parser");
const express = require("express");
const db = require("../models");
const Tutorial = db.tutorials;
const IVRS = db.ivrs;
const router = express.Router();
const excelController = require("../controllers/tutorials/excel.controller");
const userController = require("../controllers/tutorials/user.controller");
const ivrscontroller = require("../controllers/tutorials/ivrs.controller")
const upload = require("../middlewares/upload");
const Sequelize = require("sequelize");
const Excel = require('exceljs');

// const { ivrs } = require("../models");
let routes = (app) => {
  router.post("/upload", upload.single("xlsx"), excelController.upload);
  router.post('/multipleupload',upload.array('files'),excelController. uploadmuliplefiles)
  // router.get("/getalldata",userauth, excelController.getTutorials);
  router.get("/download",excelController.download);
  router.post("/register", userController().postRegister);  // post to register user
  router.post('/login',passport.authenticate('local',{successRedirect:'/data',failureRedirect:'/'}));
  router.get('/logout',userController().logout)

  router.get('/mapdata',ivrscontroller.downloadmap)
 
  
  // router.get('/register',userController.registerpage)
  

  router.get('/register',(req,res)=>{
        res.render('register.ejs')
      })

  router.get('/',(req,res)=>{
  res.render('login')
})
// router.get("/getalldata",userauth,userController().test)
   
  router.post('/ivrs',upload.array("ivrs",4),ivrscontroller.uploadivrs)
  router.get('/uploadhistory',userauth,userController().uploadHistory)

//   router.get('/response',async (req,res)=>{
 

//   // sort = req.query.select;
//   // search = req.query.search;

//   // const { q,order_by, order_direction } = req.query;
  

//   const pageAsNumber = Number.parseInt(req.query.page);
//   const sizeAsNumber = Number.parseInt(req.query.size);
//   let page = 0;
//   if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
//     page = pageAsNumber;
//   }

//   let size = 5000;

//   if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)){
//     size = sizeAsNumber;
//   }





    
//     try{
   
//        await Tutorial.findAll({
//         distinct: true,
// 		    subQuery: false,
//         limit:size,
//         offset: page * size,
      
//       }).then((alldata)=>{
    
//        IVRS.findAll(
// 		    ).then((ivrsdata)=>{
        
  
//           let numbers = new Set()
  
//           ivrsdata.forEach((num)=>{
//             numbers.add(num.mobile)
//           })
  

//           let date = new Set()
  
//           ivrsdata.forEach((data)=>{
          
//             date.add(data.UploadDate)
            
//           })
//           // console.log(ivrsdata)
//           const newdates = [...date]

         
//           //for mapping all the responses from particular number in one array------
      
// //       alldata.forEach((data)=>{
// //         let responses = []
// //           data.responses = responses
// //       })
// //         for (let i = 0; i < ivrsdata.length;i++){
// //           for (let j = 0;j < alldata.length;j++){
// //               if (ivrsdata[i].mobile === alldata[j].mobile){
// //           alldata[j].responses.push(ivrsdata[i])
// //       }
// //   }
// // }
// const mydata = alldata.map((e,i)=>{
//   let match = ivrsdata.filter(ele => ele.mobile == e.mobile)
//   if (match){
//     e.responses = match
//   }
//   return e
// })
// // console.log(mydata)
// console.log(mydata.length)



// let ptr = 0
// while(ptr < newdates.length){
//     // let include;
//     // let indx;
//     mydata.forEach((res)=>{
//         let find = res.responses.find(ele => ele.UploadDate == newdates[ptr])
//         if (find){
//           // console.log(true)
//         }else{
//           // console.log(false)
//           let resp = {UploadDate:newdates[ptr],Response:''}
//           res.responses.push(resp)

//         }
//         let response = res.responses.length
//         // console.log(response)
//         for(let i = 0;i< response;i++){
//           // console.log( res.responses[i].date)
//             if (newdates[ptr] == res.responses[i].UploadDate){
//                 // include = true
//                 if (i !== ptr){
//                     temp = res.responses[i]
//                     res.responses[i] = res.responses[ptr]
//                     res.responses[ptr] = temp
//                 }
//                 // console.log(res.Responses[ptr])
//                 break
//             }
//             // else{
//             //     // response = {date:'',Response:'',UploadDate:''}
//             //     include = false
//             // }
//         }
//         // if (include == false){
//         //   // console.log()
//         //   let resp = {UploadDate:newdates[ptr],response:'null'}
//         //   res.responses.push(resp)
//         //   // console.log(resp)
//         // }
//         // console.log(include)
// })
// ptr ++
// }     
//     // console.log(mydata)
//     // mydata.forEach(res => res.responses.forEach(resp => console.log(resp.Response,resp.mobile,resp.UploadDate)))
//     // console.log(mydata[1].responses)
//     // res.send(mydata)
//     res.render('responses',
//     {'dates':newdates,
//     'response':mydata, 
//      limit:size,
//      current:page,
//      Pages:JSON.stringify(Math.ceil(mydata.length/Number.parseInt(size)))})
    
//       })
//       })

//     }catch(err){
//       res.send(err)
//     }
    

//   })


  // Retrieve all Tutorials
  // router.post("/users", excelController.findAll);

  



  
  app.use("/", router);
  router.post('/products',async (req, res, next) => {
    let sort, query, search, search_field;

    if (req.body.select != 'undefined') {
        sort = req.body.select;
        console.log(sort)
    }

    let perPage = Number(req.body.perPage) || 1000;
    let page = Number(req.body.page) || 1;

    if (req.body.search != undefined && req.body.search_field != undefined && req.body.search != '' && req.body.search_field != '') {
        search = req.body.search;
        console.log(search)
        search_field = req.body.search_field;

        query = { 'search': search_field };
        console.log(query)

        if (search == 'mobile') {
            query = { mobile: search_field };
        }else if (search == 'Name') {
            query = { Name: search_field };
        } else if (search == 'AC_Number') {
            query = { AC_Number: search_field };
        } else if (search == 'AC_Name') {
            query = { AC_Name: search_field };
        } else {
            query = { id: search_field };
        }
    } else {
        query = { 'Name': { $ne: null } };
    }

  


    const data =  await Tutorial.findAndCountAll({ 
      // where:{
      //   AC_Name:Sequelize.col('data.Abdasa')
      // },
      distinct: true,
		  subQuery: false,
      limit: perPage ,
      offset: (perPage * page)-perPage,
      
      // order: Sequelize.fn('RANDOM'),
   
       attributes:["id","GENDER", "mobile",'Name', 'Pincode', 'state', 'AC_Number','AC_Name'],
    include:[{
      model:IVRS,
      attributes:['Response','UploadDate'],
      required:true,
      eager:true,
      
      

     
    }],
    order: [
      [Sequelize.literal('RAND()')]
    ],
    where:{
      mobile:Sequelize.col('data.mobile'),
      
      // mobile:'8401085343'

      // AC_Name: query
     
    },
    


    })


     
   let uniquedates;
   IVRS.findAll().then((obj)=>{
    const dates= obj.map((date)=>{
      let obj = {date:date.UploadDate,question:date.question}
      return obj
    })

    uniquedates = [
      ...new Map(dates.map((item) => [item["date"], item])).values(),
  ];
    console.log(uniquedates)
    // console.log(data.count)
    // res.send(data)
    let ptr = 0;
    while(ptr < uniquedates.length){
      // let include;
      // let indx;
      data.rows.forEach((res)=>{
          let find = res.IVRS_RESPONSEs.find(ele => ele.UploadDate == uniquedates[ptr].date)
          if (find){
            // console.log(true)
          }else{
            // console.log(false)
            let resp = {UploadDate:uniquedates[ptr].date,Response:''}
            res.IVRS_RESPONSEs.push(resp)
  
          }
          let response = res.IVRS_RESPONSEs.length
          // console.log(response)
          for(let i = 0;i< response;i++){
            // console.log( res.responses[i].date)
              if (uniquedates[ptr].date == res.IVRS_RESPONSEs[i].UploadDate){
                  
                  if (i !== ptr){
                      temp = res.IVRS_RESPONSEs[i]
                      res.IVRS_RESPONSEs[i] = res.IVRS_RESPONSEs[ptr]
                      res.IVRS_RESPONSEs[ptr] = temp
                  }
                  break
              }
          }
  })
  ptr ++
  }

    res.render('alldata',{'data':data.rows,
      content: data.rows,
      current:  page,
      perPage: perPage,
      query:query,
      sort: sort,
      search: search,
      Pages:Math.ceil(data.count/( perPage)),

      // sort: sort,
      // search: search,
      // Pages:JSON.stringify( Math.ceil(data.count / Number.parseInt(page))),
      'dates':uniquedates
    });


  })

})




  

};
module.exports = routes;

