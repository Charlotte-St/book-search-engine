const { Book, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        book: async ()=> {
            return Book.find({})
        }
    },
    Mutation: {
        saveBook: async (parent, { bookId, user}) => {
            const book = await User.findOneAndUpdate(
                { username: user },
                { $addToSet: { savedBooks: user.bookId}}
            );

            return book
        },
        createUser: async (parent, { username, email, password}) => {
            const user = await User.create({ username, email, password});
            const token = signToken(user);
            return { token, user};
        },
        login : async (parent, { email, password }) => {
            const user = await User.findOne({email});

            if (!user) {
                throw AuthenticationError
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError
            }

            const token = signToken(user);

            return { token, user}
        },
        removeBook: async (parent, { userId, bookId}) => {
            return User.findOneAndUpdate(
                { _id: userId}, 
                { $pull: { savedBooks: { _id: bookId}}}, 
                { new: true}
            )
        }
    }
};

module.exports = resolvers;