import {gql} from "@apollo/client";

export const CREATE_USER = gql`
mutation createUser($newData: CreateInput!){
  CreateUser(newData: $newData){
    email
    password
    token
    
  }
}
`

export const LOGIN_USER = gql`
mutation LoginUser($newData: CreateInput!){
  LoginUser(newData: $newData){
    id
    email
    password
    token
  } 
  }
`
export const EDIT_PROFILE = gql`
mutation editUser($newData: EditInput!){
  UpdateUser(newData: $newData){
    id
    name
    mobile
    email
    password
    }
}
`
