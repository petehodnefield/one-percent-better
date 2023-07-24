import { GraphQLError } from "graphql";
import User from "../models/User.js";
// Resolvers define how to fetch the types defined in your schema.
export const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      return await User.create(args);
    },
  },
};
