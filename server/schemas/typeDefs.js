const typeDefs = `
    type Book {
        authors: String
        description: String!
        bookId: String!
        image: String
        title: String!
        link: String
    }

    type User {
        _id: String!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [book]
    }

    type Auth {
        token: ID!
        user: [User]
    }

    type Query {
        me: [User]
        book: [Book]
        users(username: String): [User]
    }

    type Mutation {
        addUser(username: String!, password: String!, email: String!): Auth
        getSingleUser(username: String!): User
        saveBook(authors: String, description: String!, title: String!, bookId: String!, image: String, link: String): User
        removeBook ( bookId: String!): User
        login(username: String!, password: String!): Auth
  }
`