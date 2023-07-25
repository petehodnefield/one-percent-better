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
