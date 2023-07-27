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

export const USERNAME = gql`
  query Username($username: String!) {
    username(username: $username) {
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
      areas {
        _id
        area
      }
    }
  }
`;

export const SINGLE_AREA = gql`
  query Area($areaId: ID!) {
    area(id: $areaId) {
      _id
      area
      improvements {
        _id
        date
        skillPercentage
        description
      }
    }
  }
`;

export const AREAS = gql`
  query Areas {
    areas {
      _id
      area
      improvements {
        _id
        date
        skillPercentage
        description
      }
    }
  }
`;
