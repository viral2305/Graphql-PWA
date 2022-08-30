import {gql} from '@apollo/client'

export const GET_USER = gql`
  query GetAllUser(){
     user{
      id
      name
      mobile
      email
      password
     }
  }
`
