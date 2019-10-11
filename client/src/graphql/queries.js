import gql from 'graphql-tag';


export default {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  FETCH_USER: gql`
    query FetchUser($_id: ID!) {
      user(_id: $_id){
        name
        email
        userRole
        paymentEmail
      }
    }
    `,
    FETCH_USER_ID: gql`
      query FetchUser($_id: ID!) {
        user(_id: $_id) {
          _id
        }
      }
      `
}
