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
// const { ivrs } = require("../models");
let routes = (app) => {
  router.post("/upload", upload.single("xlsx"), excelController.upload);
  router.post('/multipleupload',upload.array('files',4),excelController. uploadmuliplefiles)
  // router.get("/getalldata",userauth, excelController.getTutorials);
  router.get("/download", userauth,excelController.download);
  router.post("/register", userController().postRegister);  // post to register user
  router.post('/login',passport.authenticate('local',{successRedirect:'/data',failureRedirect:'/'}));
  router.get('/logout',userController().logout)
  
  // router.get('/register',userController.registerpage)
  

  router.get('/register',(req,res)=>{
        res.render('register.ejs')
      })

  router.get('/',(req,res)=>{
  res.render('login')
})
router.get("/getalldata",userauth,userController().test)
   
  router.post('/ivrs',upload.array("ivrs",4),ivrscontroller.uploadivrs)
  router.get('/uploadhistory',userauth,userController().uploadHistory)

  router.get('/response',(req,res)=>{
    try{
      Tutorial.findAll().then((alldata)=>{
        IVRS.findAll().then((ivrsdata)=>{
  
          let numbers = new Set()
  
          ivrsdata.forEach((num)=>{
            numbers.add(num.mobile)
          })
  

          let date = new Set()
  
          ivrsdata.forEach((data)=>{
          
            date.add(data.UploadDate)
            
          })
          // console.log(ivrsdata)
          const newdates = [...date]

          console.log(newdates)
          //for mapping all the responses from particular number in one array------
      
      alldata.forEach((data)=>{
        let responses = []
          data.responses = responses
      })
        for (let i = 0; i < ivrsdata.length;i++){
          for (let j = 0;j < alldata.length;j++){
              if (ivrsdata[i].mobile === alldata[j].mobile){
          alldata[j].responses.push(ivrsdata[i])
      }
  }
}
let ptr = 0

while(ptr < newdates.length){
    let include;
    
    // let indx;
    alldata.forEach((res)=>{
        let response = res.responses.length
        // console.log(response)
        for(let i = 0;i< response;i++){
          // console.log( res.responses[i].date)
            if (newdates[ptr] == res.responses[i].UploadDate){
                include = true
                if (i !== ptr){
                    temp = res.responses[i]
                    res.responses[i] = res.responses[ptr]
                    res.responses[ptr] = temp
                  
                }
                // console.log(res.Responses[ptr])
                break
            }else{
                // response = {date:'',Response:'',UploadDate:''}
                include = false
            }
        }
        if (include == false){
          
          let resp = {UploadDate:newdates[ptr],response:'--'}
          res.responses.push(resp)
          console.log(res)
        }
        // console.log(include)

})
ptr ++
}

    res.render('responses',{'dates':newdates,'response':alldata})
  
        })
      })

    }catch(err){
      res.send(err)
    }
    

  })
  app.use("/", router);
  

};
module.exports = routes;