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
    user: async (_,{id},context) => {

      console.log('id',id)
      if (!context.user) throw new AuthenticationError('you must be logged in','401');
      return context.dataSources.User.find({_id:id})
    }
  },

  Mutation: {
    CreateUser:async  (_,{newData},context) => {
      const user = await context.dataSources.User.findOne({email: newData.email});
      console.log('user',user)
      if (user) {
        throw new Error("Admin already exists.")
      }else
      {
        const newUser = new context.dataSources.Admin({
          ...newData, token: await jwt.sign(newData.email, '@1@Viral@1@')
        });
        newUser.save();
        return newUser;
      }
    }
  }
};

module.exports = resolvers