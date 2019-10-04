import gql from "graphql-tag";

export default {
  REGISTER_USER: gql`
    mutation RegisterUser($name: String!, $email: String!, $password: String!) {
      register(name: $name, email: $email, password: $password) { 
        token
        loggedIn
      }
    }
  `,
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        loggedIn
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
      }
    }
  `,
  CREATE_ANIMAL: gql`
    mutation CreateAnimal($name: String!, $type: String!, $age: Int!, $sex: String!, $color: String!, $description: String!, $image: String, $video: String, $application: String) {
    newAnimal(name: $name , type: $type , age: $age , sex: $sex , color: $color , description: $description , image: $image , video: $video , application: $application ) {
      name
      type
      age
      sex
      color
      description
      image
      video
      application
      }
    }
  `

}