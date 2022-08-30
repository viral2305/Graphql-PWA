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

