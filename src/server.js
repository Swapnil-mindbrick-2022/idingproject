
const express = require("express");
const app = express();
const db = require("./models");
const path = require('path');
const initRoutes = require("./routes/user.js");
global.__basedir = __dirname + "/..";

const  bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');	
// app.use(express.urlencoded({ extended: true }));

app.get("/data", function (req, res) {
  res.render(path.join(__dirname, "./views/index.ejs"));
});
// app.get("/register", function (req, res) {
//   res.render(path.join(__dirname, "./views/register.ejs"));
// });




initRoutes(app);
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
let port = 3001;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});