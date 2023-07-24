import { GraphQLError } from "graphql";
import User from "../models/User.js";
import Improvement from "../models/Improvement.js";
// Resolvers define how to fetch the types defined in your schema.
export const resolvers = {
  Query: {
    // User Queries
    users: async () => {
      return await User.find().populate("improvements");
    },
    user: async (parent, args) => {
      return await User.findOne({ _id: args.id }).populate("improvements");
    },

    // Improvement Queries
    improvements: async () => {
      return await Improvement.find();
    },
    improvement: async (parent, args) => {
      return await Improvement.findOne({ _id: args.id });
    },
  },
  Mutation: {
    // User Mutations
    addUser: async (parent, args) => {
      return await User.create(args);
    },
    updateUser: async (parent, args) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: args.id },
        {
          username: args.username,
          password: args.password,
        }
      );
      return updatedUser;
    },
    deleteUser: async (parent, args) => {
      const deleteUser = await User.findOneAndDelete({ _id: args.id });
      return deleteUser;
    },

    // Improvement Mutations
    addImprovement: async (parent, args) => {
      const newImprovement = await Improvement.create(args);
      const updateUser = await User.findByIdAndUpdate(
        { _id: args.userId },
        { $push: { improvements: newImprovement } },
        { new: true }
      );
      return newImprovement;
    },

    updateImprovement: async (parent, args) => {
      const updatedImprovement = await Improvement.findOneAndUpdate(
        { _id: args.id },
        {
          date: args.date,
          skillPercentage: args.skillPercentage,
          description: args.description,
        }
      );
      return updatedImprovement;
    },

    deleteImprovement: async (parent, args) => {
      const deletedImprovement = await Improvement.findOneAndDelete({
        _id: args.id,
      });
      return deletedImprovement;
    },
  },
};
