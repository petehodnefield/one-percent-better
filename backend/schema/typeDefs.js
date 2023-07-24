// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `
    type User {
        _id: ID
        username: String
        password: String
        improvements: [Improvement]
    }

    type Improvement {
        _id: ID
        date: String
        skillPercentage: Int
        description: String
    }

    type Query {
        users: [User]
    }
    type Mutation {
        addUser(username: String!, password: String!): User
    }
`;
