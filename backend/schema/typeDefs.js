// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `
    type User {
        _id: ID
        username: String
        password: String
        areas: [Area]
    }

    type Improvement {
        _id: ID
        date: String
        skillPercentage: Float
        description: String
    }

    type Area {
        _id: ID
        area: String
        improvements: [Improvement]
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        users: [User]
        user(id: ID!): User
        username(username: String!): User
        me: User


        improvements: [Improvement]
        improvement(id: ID!): Improvement
    }
    type Mutation {
        addUser(username: String!, password: String!): Auth
        addImprovement(date: String!, skillPercentage: Float!, description: String!, userId: ID!): Improvement

        updateUser(id: ID!, username: String, password: String): User
        updateImprovement(id: ID!, date: String, skillPercentage: Float, description: String): Improvement

        deleteUser(id: ID!): User
        deleteImprovement(id: ID!): Improvement

        login(username: String!, password: String!): Auth

    }
`;
