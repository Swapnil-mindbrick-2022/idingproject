
const express = require("express");
const app = express();
const db = require("./database");
const path = require('path');
const initRoutes = require("./routes/user.js");
global.__basedir = __dirname + "/..";
const passport = require('passport')
const  bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const session = require('express-session')
const mysql = require('mysql2')
const {initializingPassport} = require('./config/passportConfig.js')
var MySQLStore = require('express-mysql-session')(session)
app.set('views', path.join(__dirname, 'views'));


app.set('view engine', 'ejs');	
// app.use(express.urlencoded({ extended: true }));

db.sync();
const mydb = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "password123",
  DB: "mbtest",
  dialect: "mysql",
  port:3306
}
const sessionStore = new MySQLStore(mydb);


app.use(session({
	key: 'secretkey',
	secret: 'secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));
initializingPassport(passport)
app.use(passport.initialize())
app.use(passport.session())

app.get("/data", function (req, res) {
  res.render(path.join(__dirname, "./views/index.ejs"));
});



initRoutes(app);










let port = 3001;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});