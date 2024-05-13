const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { input } , context) => {
        console.log('Starting saveBook')
        if (context.user){
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: input}},
                { new: true}
            );
            console.log('Success');
            return updatedUser
        }
    },
    createUser: async (parent, { username, email, password}) => {
        const user = await User.create({ username, email, password});
        const token = signToken(user);
        return { token, user};
    },
    deleteBook: async (parent, { userId, bookId}) => {
        return User.findOneAndUpdate(
            { _id: userId}, 
            { $pull: { savedBooks: { _id: bookId}}}, 
            { new: true}
        )
    }
  },
};

module.exports = resolvers;
