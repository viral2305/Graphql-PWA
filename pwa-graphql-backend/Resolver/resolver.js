const jwt = require('jsonwebtoken');
const {AuthenticationError} = require("apollo-server-errors");


const resolvers ={
  Query: {
    users: async (_,{},context) => {
      if (!context.user) throw new AuthenticationError('you must be logged in','401');
      const totalData = await context.dataSources.User.countDocuments()
      const user = await context.dataSources.User.find().skip(offset).limit(limit)
      user.count = totalData
      console.log('user',user)

      return user
    },
    user: async (_,{},context) => {
      if (!context.user) throw new AuthenticationError('you must be logged in');
      const userProfile = await context.dataSources.Admin.findOne({_id: context.user})
      return userProfile
    }
  },

  Mutation: {
    CreateUser: async  (_,{newData},context) => {
      const user = await context.dataSources.Admin.findOne({email: newData.email});
      // console.log('user',user)
      if (user) {
        throw new Error("This UserEmail is already exists.")
      }else {
        const newAdmin = new context.dataSources.Admin({
          ...newData,
        });
        var newUserRsp = []
        await newAdmin.save().then(async  (result) => {
          const newUser = await context.dataSources.Admin.find({$and:[{email: result.email},{password: result.password}]})
          const token = await jwt.sign((newUser[0]._id).toString(), "@1@viral@1@")
          const updateUser = await context.dataSources.Admin.findOneAndUpdate({email: newUser[0].email },{token: token},{
            new: true
          })
          newUserRsp.push(updateUser)
        });
        return newUserRsp[0]
      }
    },
    LoginUser: async (_,{newData},context) => {
      const userFound = await context.dataSources.Admin.find({$and:[{email:newData.email},{password:newData.password}]})

      if(userFound && userFound.length){
        return userFound[0]
      }else{
        throw new Error('Invalid Email or Password')
      }
    },
    UpdateUser: async (_,{newData},context) => {
      const newuser = await context.dataSources.Admin.findOneAndUpdate({_id: context.user },{...newData},{
        new: true
      })
      return newuser
    }
  }

};

module.exports = resolvers