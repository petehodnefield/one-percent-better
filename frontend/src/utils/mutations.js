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
