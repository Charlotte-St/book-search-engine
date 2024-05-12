const { Book, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        book: async ()=> {
            return Book.find({})
        }
    },
    Mutation: {
        saveBook: async (parent, args) => {
            const book = await User.findOneAndUpdate(
                { _id },
                { $inc: { }},
                {new: true}
            )
        },
        addUser: async (parent, { username, email, password}) => {
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
        removeBook: async (parent, args) => {

        }
    }
};

module.exports = resolvers;