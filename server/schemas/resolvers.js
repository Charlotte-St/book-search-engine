const { Book, User } = require('../models');

const resolvers = {
    Query: {
        book: async ()=> {
            return Book.find({})
        }
    },
    Mutation: {
        addBook: async (parent, args) => {
            const book = await User.findOneAndUpdate(
                { _id },
                { $inc: { }},
                {new: true}
            )
        }
    }
};

module.exports = resolvers;