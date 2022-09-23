const db = require('../../models')

const User = db.users

function userController(){
  return{
    async postRegister(req,res){
      const userData = req.body

      if (!userData.fullname && !userData.username && !userData.dob && userData.password){
        res.send('All Fields Are Mandatory')
      }else{
        User.findOne({
          where: {username: userData.username}
        }).then((user)=>{
          if (! user){
            const newUser = new User({
              fullname: userData.fullname,
              username: userData.username,
              dob: userData.dob,
              password: userData.password
            })
            newUser.save()
            res.redirect('api/login')
          }else{
            res.send('user already exists')
          }
        })
      }
    },
    async postLogin (req, res){
      const userdata = req.body

      User.findOne({where: {username: userdata.username, password: userdata.password}}).then((user)=>{
        if (!user){
          res.redirect('/api/login')
        }else{
          res.redirect('/data')
        }
        
      })
    },
    async logout ( req,res){
      req.session.destroy((err)=>{
        if(err){
          console.log(err)
        }else{
          res.redirect('/api/login')
        }

      })
    }
  }
}
module.exports = userController