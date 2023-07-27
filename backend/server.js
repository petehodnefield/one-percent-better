import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";
import seedDB from "./seed.js";
import auth from "./utils/auth.js";

const db = await mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/one-percent-better"
);
const seed = await seedDB();
console.info("connected to db!");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: "bounded",
  persistedQueries: false,
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
  context: auth.authMiddleware,
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
