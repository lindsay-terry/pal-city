const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(error);
        }
    },
    
    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID.' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Create a new user
    async createNewUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json({user, message: 'User created successfully.' });
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Update existing user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({_id: req.params.userId}, req.body, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID.' });
            }
            res.status(200).json({ user, message: 'User updated successfully.' });
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Delete user and associated thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID.' });
            }
            const { deletedThoughts } = await Thought.deleteMany({ username: user.username });
            if (deletedThoughts === 0) {
                return res.status(200).json({ message: 'User successfully deleted.  No thoughts found to delete.' });
            }
            res.status(200).json({ message: 'User successfully deleted. All associated thoughts deleted.' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Add a friend
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: {friends: req.params.friendId }}, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID.' });
            }
            res.status(200).json({user, message: 'Friend added!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Delete a friend
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: {friends: req.params.friendId }}, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID.' });
            }
            res.status(200).json({user, message: 'Friend deleted!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error' });
            console.error(error);
        }
    }
};