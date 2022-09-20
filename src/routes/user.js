const passport = require("passport");
// const excelController = require("../controllers/tutorials/excel.controller");
// const userController = require('../controllers/tutorials/user.controller')
// const express = require('express');
// const app= express();
// const upload = require("../middlewares/upload");
// let userRoute = (app) => {
//   app.post("/upload", upload.single("xlsx"), excelController.upload);
//   app.get("/getalldata", excelController.getTutorials);
//   app.get("/download", excelController.download);
//   app.post("/register", userController().postRegister);  // post to register user
//   app.post('/login',passport.authenticate('local',{successRedirect:'/getalldata',failureRedirect:'/login'}));
//   app.get('/register',(req,res)=>{
//     res.render('register.ejs')
//   })
//   app.use(userRoute)
// //get login
// app.get('/login',(req,res)=>{
//   res.render('login')
// })
   
// };
// module.exports = userRoute;

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
  router.get("/getalldata", excelController.getTutorials);
  router.get("/download", excelController.download);
  router.post("/register", userController().postRegister);  // post to register user
  router.post('/login',passport.authenticate('local',{successRedirect:'/getalldata',failureRedirect:'/login'}));
  
  // router.get('/register',userController.registerpage)
  router.get("/register", function (req, res) {
    res.render("register.ejs")
  });

  router.get('/register',(req,res)=>{
        res.render('register.ejs')
      })

  router.get('/login',(req,res)=>{
  res.render('login')
})
   
  router.post('/ivrs',upload.single("ivrs"),ivrscontroller.upload)
  app.use("/api", router);
};
module.exports = routes;