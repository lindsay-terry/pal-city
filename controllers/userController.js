const { User } = require('../models');

module.exports = {
    // /api/users route
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId})
            .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'NO user found with that ID.' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create a new user
    async createNewUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json({user, message: 'User created successfully.' });
        } catch (error) {
            res.status(500).json(error);
        }
    }
};