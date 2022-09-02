import {gql} from '@apollo/client'

export const GET_USER = gql`
  query GetAllUser{
     user{
      id
      name
      mobile
      email
      password
     }
  }
`
export const GET_USER_BY_TOKEN = gql`
query GetUserByToken{
      user{
        id
        name
        mobile
        email
        password
      }
}`