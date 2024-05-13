const typeDefs = `
    type Book {
        authors: [String]
        description: String!
        bookId: ID
        image: String
        title: String!
        link: String
    }

    type User {
        _id: ID
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        user(userId: ID!): User
        book: [Book]
        getSingleUser: User
    }

    input BookInput {
        bookId: String!
        authors: [String]
        title: String!
        description: String!
        image: String
        link: String
    }

    type Mutation {
        createUser(username: String!, password: String!, email: String!): Auth
        deleteBook ( bookId: String!): User
        login(email: String!, password: String!): Auth
        saveBook(input: BookInput): User
  }
`

module.exports = typeDefs;