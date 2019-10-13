import gql from 'graphql-tag';


export default {
  
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  USER_ID: gql`
    query IsUserLoggedIn {
      userId @client
    }
    `,
  FETCH_USER: gql`
    query FetchUser($_id: ID!){
      user(_id: $_id) {
        userRole,
        shelter{
          name
          location
          paymentEmail
          animals{
            _id
          }
          users{
            _id
          }
        }

      }
    }
  `,
  FIND_ANIMALS:gql`
    query FindAnimals($type: String!){
      findAnimals(type: $type) {
        name
      }
    }
  `
}
