import { gql } from "@apollo/client";

export const ADD_IMPROVEMENT = gql`
  mutation Mutation(
    $date: String!
    $skillPercentage: Float!
    $description: String!
    $userId: ID!
  ) {
    addImprovement(
      date: $date
      skillPercentage: $skillPercentage
      description: $description
      userId: $userId
    ) {
      _id
      date
      skillPercentage
      description
    }
  }
`;

export const UPDATE_IMPROVEMENT = gql`
  mutation UpdateImprovement(
    $updateImprovementId: ID!
    $date: String
    $skillPercentage: Float
    $description: String
  ) {
    updateImprovement(
      id: $updateImprovementId
      date: $date
      skillPercentage: $skillPercentage
      description: $description
    ) {
      _id
      date
      skillPercentage
      description
    }
  }
`;

export const DELETE_IMPROVEMENT = gql`
  mutation DeleteImprovement($deleteImprovementId: ID!) {
    deleteImprovement(id: $deleteImprovementId) {
      _id
      date
      skillPercentage
      description
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
        password
        improvements {
          _id
          date
          skillPercentage
          description
        }
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        password
        improvements {
          _id
          date
          skillPercentage
          description
        }
      }
    }
  }
`;
