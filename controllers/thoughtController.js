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
            // Find user_id based on username to assign thought to correct user
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json({ message: 'No user found with that username' });
            }
            const thought = await Thought.create(req.body);
            // Find associated user and update user document with created thought
            await User.findByIdAndUpdate( user._id , { $addToSet: { thoughts: thought._id }}, { new: true });

            res.status(200).json({thought, message: 'Thought created!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId}, req.body, { new: true });
            if (!thought) {
                res.status(404).json({ message: 'No thought found with that ID' });
            }
            res.status(200).json({thought, message: 'Thought updated successfullly!' });
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID.' });
            }
            // Find the user to remove the thought ID from their thought array
            const user = await User.findOneAndUpdate({ username: thought.username }, { $pull: {thoughts: req.params.thoughtId }}, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'Thought deleted but no user found to remove from thoughts.' });
            }
            res.status(200).json({ message: 'Thought successfully deleted!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    // Create a reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body }}, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID.' });
            }
            res.status(200).json({ thought, message: 'Reaction added successfully!' });
        } catch(error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    },

    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {$pull: { reactions: {_id: req.params.reactionId}}}, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID.' });
            }
            res.status(200).json({ thought, message: 'Reaction successfully deleted.' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(error);
        }
    }
};