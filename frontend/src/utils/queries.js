import { gql } from "@apollo/client";

export const IMPROVEMENTS = gql`
  query Improvements {
    improvements {
      _id
      date
      skillPercentage
      description
    }
  }
`;

export const SINGLE_USER = gql`
  query Query($userId: ID!) {
    user(id: $userId) {
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
`;

export const ME = gql`
  query Query {
    me {
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
`;
