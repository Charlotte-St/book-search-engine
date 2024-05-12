//const { deleteBook } = require('../controllers/user-controller');
const { Book, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user){
               return User.findOne({ _id: context.user._id})
               .select("-__v -password")
               .populate("books");
            }
            throw AuthenticationError
        },

       getSingleUser: async (parent, { user = null, params }) => {
            const foundUser = await User.findOne({
              $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
            });
        
            if (!foundUser) {
              return res.status(400).json({ message: 'Cannot find a user with this id!' });
            }
        
            res.json(foundUser);
          },
    },
    Mutation: {
        saveBook: async (parent, { bookData}, context) => {
            const book = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: user.bookId}},
                { new: true}
            ).populate('books');

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
        deleteBook: async (parent, { userId, bookId}) => {
            return User.findOneAndUpdate(
                { _id: userId}, 
                { $pull: { savedBooks: { _id: bookId}}}, 
                { new: true}
            )
        }
    }
};

module.exports = resolvers;