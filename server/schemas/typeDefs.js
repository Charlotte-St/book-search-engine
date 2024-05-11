const typeDefs = `
    type Book {
        authors: String
        description: String!
        bookId: String!
        image: String
        title: String!
    }

    type User {
        username: String!
        email: String!
        password: String!
        savedBooks: [book]
    }

    type Query {
        book: [Book]
        users(username: String): [User]
    }

    type Mutation {
        createUser(username: String!, password: String!, email: String!): User
        getSingleUser(username: String!): User
        saveBook(bookId: String!): Book
        deleteBook (username: String!, bookId: string!): User
        login(username: String!, password: String!): User
  }
`