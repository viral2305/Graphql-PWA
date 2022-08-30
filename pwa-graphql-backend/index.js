const {ApolloServer} = require('apollo-server')
const {User,Admin} = require('./DataSource/model')
const typeDefs = require('./typeDefs/typeDefs')
const resolvers = require('./Resolver/resolver')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization.split('Bearer ')[1] || '';
    let user ;
    if(token){
      user = await jwt.verify(token, "@1@Viral@1@");
    }
    return {user};
  },
  dataSources: () => {
    return {
      User: User,
      Admin: Admin
    }
  }
})

server.listen({port: 4001,}).then(() => {
console.log('server is running port 4001')
})

mongoose.connect("mongodb://localhost:27017",{useNewUrlParser: true});
let conn = mongoose.connection;
conn.on('connected', function () {
  console.log('database is connected successfully');
});
conn.on('disconnected', function () {
  console.log('database is disconnected successfully');
});
conn.on('error', console.error.bind(console, 'connection error:'));
