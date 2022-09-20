const db = require('../../models')

const user = db.users



function userController(){
  return{
    async postRegister(req,res){
      const userData = req.body

      if (!userData.fullname && !userData.username && !userData.dob && userData.password){
        res.send('All Fields Are Mandatory')
      }else{
        const found = user.findOne({
          where: {username: userData.username}
        })

        if (found){
          console.log(found)
          res.send('User already exists')
        }else{
          const newUser = new user({
            fullname: userData.fullname,
            username: userData.username,
            dob: userData.dob,
            password: userData.password
          })
          newUser.save()
          res.redirect('api/login')
        }
      }
    }

  }
}
module.exports = userController