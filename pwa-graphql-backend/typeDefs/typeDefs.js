const {gql} = require('apollo-server');

const typeDefs = gql`
    type Query{
    users:[User]
    user(id: String!): [User]
 }
 
 type User{
     id:String
     name:String
     mobile:Int
     email:String
     password:String
 } 
 
 type LoginUser{
      id: String
      email: String
      password: String
      token: String
 }
 
 type Mutation{
    CreateUser(newData: CreateInput!): LoginUser
    LoginUser(newData: CreateInput!): LoginUser
    EditUser(newData: EditInput!): User
 }
  input CreateInput{
     email: String!
     password: String!
     confirmPassword: String!
  }
  
  input EditInput{
    id: String!
    name:String
    mobile:Int
    email:String
    password:String
  }      
 
`
module.exports = typeDefs;