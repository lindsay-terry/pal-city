const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Get single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID.' });
            }
            res.status(200).json(thought);
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Create a new thought
    async newThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            // Find associated user and update user document with created thought
            const user = await User.findOneAndUpdate( {_id: req.body.userId }, { $addToSet: { thoughts: thought._id }}, { new: true });

            if (!user) {
                return res.status(404).json({ message: 'Thought created, but found no user with that ID.' });
            }
            res.status(200).json({thought, message: 'Thought created!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    }
};