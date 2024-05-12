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
        _id: ID!
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
        book: [Book]
        getSingleUser: User
    }

    input bookInput {
        bookId: ID!
    }

    type Mutation {
        createUser(username: String!, password: String!, email: String!): Auth
        deleteBook ( bookId: String!): User
        login(email: String!, password: String!): Auth
        saveBook(bookData: bookInput!): User
  }
`

module.exports = typeDefs;