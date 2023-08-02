import { GraphQLError } from "graphql";
import User from "../models/User.js";
import Improvement from "../models/Improvement.js";
import Area from "../models/Area.js";
import auth from "../utils/auth.js";
// Resolvers define how to fetch the types defined in your schema.
export const resolvers = {
  Query: {
    // User Queries
    users: async () => {
      return await User.find().populate({
        path: "areas",
        populate: { path: "improvements", model: "Improvement" },
      });
    },
    user: async (parent, args) => {
      return await User.findOne({ _id: args.id }).populate({
        path: "areas",
        populate: { path: "improvements", model: "Improvement" },
      });
    },
    username: async (parent, args) => {
      return await User.findOne({ username: args.username }).populate(
        "improvements"
      );
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate({
            path: "areas",
            populate: { path: "improvements", model: "Improvement" },
          });

        return userData;
      }
    },

    // Area Queries
    areas: async (parent, args) => {
      return await Area.find().populate("improvements");
    },
    area: async (parent, args) => {
      return await Area.findOne({ _id: args.id }).populate("improvements");
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
      const user = await User.create(args);
      const token = auth.signToken(user);

      return { token, user };
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

    // Login
    login: async (parent, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user) {
        throw new GraphQLError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        throw new GraphQLError("Incorrect credentials");
      }

      const token = auth.signToken(user);
      return { token, user };
    },

    // Area Mutations
    addArea: async (parent, args) => {
      const newArea = await Area.create(args);
      const updateUser = await User.findByIdAndUpdate(
        { _id: args.userId },
        { $push: { areas: newArea } },
        { new: true }
      );
      return newArea;
    },
    updateArea: async (parent, args) => {
      const updatedArea = await Area.findOneAndUpdate(
        { _id: args.id },
        {
          area: args.area,
        }
      );
      return updatedArea;
    },
    deleteArea: async (parent, args) => {
      const deletedArea = await Area.findOneAndDelete({
        _id: args.id,
      });
      return deletedArea;
    },

    // Improvement Mutations
    addImprovement: async (parent, args) => {
      const newImprovement = await Improvement.create(args);
      const updateArea = await Area.findByIdAndUpdate(
        { _id: args.areaId },
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
      try {
        const deletedImprovement = await Improvement.findOneAndDelete({
          _id: args.id,
        });
        const getAllImprovements = await Improvement.find({});
        return getAllImprovements;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
