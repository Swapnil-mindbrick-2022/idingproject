const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,
   retry: {
    max: dbConfig. retry.max,
    min: dbConfig. retry.min,
    acquire: dbConfig. retry.acquire,
    idle: dbConfig. retry.idle,
    max_allowed_packet: dbConfig. retry.max_allowed_packet,
    backoffBase:dbConfig. retry.backoffBase,
    backoffExponent:dbConfig. retry.backoffExponent
  }
});

sequelize.authenticate()
.then(() => {
    console.log('connected..')  
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize)//Gujarat model------
db.users=require("./user.model.js")(sequelize, Sequelize)
db.ivrs=require("./ivrs.model.js")(sequelize, Sequelize)//Gujarat IVRS----
db.himachal = require("./himachal.model.js")(sequelize,Sequelize) //himachal data -----
db.ivrsHimachal = require("./himachalIVRS.model")(sequelize,Sequelize) //IVRS- Himachal ----------
db.uploadhistory=require("./uploadhistory.model.js")(sequelize, Sequelize)
db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})
// db.tutorials.hasMany(db.ivrs, {
//   foreignKey: 'id',
//   as: 'IVRS_RESPONSE'
// });
// db.ivrs.belongsTo(db.tutorials, {
//   foreignKey: 'id',
//   as: 'data'
// })
// db.tutorials.hasMany(db.ivrs)
// db.tutorials.hasOne(db.ivrs,{foreignKey: 'id'})  //default
db.tutorials.hasMany(db.ivrs,{foreignKey: 'mobile',sourceKey: "mobile",}) //Gujarat Model-----
db.ivrs.belongsTo(db.tutorials,{foreignKey: 'mobile', targetKey: "mobile",constraints: false,}) //gujarat IVRS--
db.himachal.hasMany(db.ivrsHimachal,{foreignKey: 'mobile',sourceKey: "mobile",}) //Himachal Data-----
db.ivrsHimachal.belongsTo(db.himachal,{foreignKey: 'mobile', targetKey: "mobile",constraints: false}) //Himachal Ivrs--


module.exports = db;

