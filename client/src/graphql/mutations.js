import gql from "graphql-tag";

export default {
  REGISTER_USER: gql`
    mutation RegisterUser($userRole: String,$name: String!, $email: String!, $password: String!) {
      register(userRole: $userRole,name: $name, email: $email, password: $password) {
        token
        loggedIn,
        userRole
      }
    }
  `,
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        loggedIn,
        _id
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn,
        _id
      }
    }
  `,
  CREATE_ANIMAL: gql`
    mutation CreateAnimal($name: String!, $type: String!, $age: Int!, $sex: String!, $color: String!, $description: String!, $image: String, $video: String, $applications: ID) {
      newAnimal(name: $name , type: $type , age: $age , sex: $sex , color: $color , description: $description , image: $image , video: $video , applications: $applications ) {
        name
        type
        age
        sex
        color
        description
        image
        video
        applications{
          animalId
        }
        }
    }
  `,
  CREATE_APPLICATION: gql`
    mutation CreateApplication($animalId: String!, $userId: String!, $applicationData: String!) {
      newApplication(animalId: $animalId, userId: $userId, applicationData: $applicationData) {
        animalId
        userId
        applicationData
        }
    }
  `,
  CREATE_SHELTER: gql`
    mutation CreateShelter($name: String!, $location: String!, $paymentEmail: String!) {
      newShelter(name: $name, location: $location, paymentEmail: $paymentEmail) {
        name
        location
        paymentEmail
        }
    }
  `

}