const mongoose = require('mongoose');
const User = require('../../models/user');

module.exports = {
    createUser: async (name) => {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: name
        });
        try {
            const newUserEntry = await user.save()
            return newUserEntry;
        } catch (error) {
            throw error
        }
    },

    getUser: async (id) => {
        // ..
    },

    getAllUsers: async () => {
        // ...
    }
}