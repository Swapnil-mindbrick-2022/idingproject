const passport = require("passport");
const userauth=require('../middlewares/Auth/userauth')
const { urlencoded } = require("body-parser");
const express = require("express");


const router = express.Router();
const excelController = require("../controllers/tutorials/excel.controller");
const userController = require("../controllers/tutorials/user.controller");
const ivrscontroller = require("../controllers/tutorials/ivrs.controller")

const upload = require("../middlewares/upload");
let routes = (app) => {
  router.post("/upload", upload.single("xlsx"), excelController.upload);
  router.post('/multipleupload',upload.array('files',4),excelController. uploadmuliplefiles)
  // router.get("/getalldata",userauth, excelController.getTutorials);
  router.get("/download", userauth,excelController.download);
  router.post("/register", userController().postRegister);  // post to register user
  router.post('/login',passport.authenticate('local',{successRedirect:'/data',failureRedirect:'/api/login'}));
  router.get('/logout',userController().logout)
  
  
  // router.get('/register',userController.registerpage)
  

  router.get('/register',(req,res)=>{
        res.render('register.ejs')
      })

  router.get('/login',(req,res)=>{
  res.render('login')
})
router.get("/getalldata",userauth,userController().test)
   
  router.post('/ivrs',upload.single("ivrs"),ivrscontroller.upload)
  router.get('/uploadhistory',userauth,userController().uploadHistory)
  app.use("/api", router);

};
module.exports = routes;