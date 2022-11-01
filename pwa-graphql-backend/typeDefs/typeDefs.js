const {gql} = require('apollo-server');

const typeDefs = gql`
    type Query{
    users:[User]
    user:User
 }
 
 type User{
     id:String
     name:String
     mobile:String
     email:String
     password:String
     token: String
 } 
 
 type LoginUser{
      id: String
      email: String
      password: String
      token: String
 }
 
 type Mutation{
    CreateUser(newData: CreateInput!): User
    LoginUser(newData: CreateInput!): User
    UpdateUser(newData: EditInput!): User
    ForgotPassword(email: String!): Data
 }
 type Data{
     message:String
 } 
  input CreateInput{
     email: String!
     password: String!
     confirmPassword: String
  }
  
  input EditInput{
    name:String
    mobile:String
    email:String
    password:String
  }      
 
`
module.exports = typeDefs;