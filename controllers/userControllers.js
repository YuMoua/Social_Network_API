const { Thoughts, Users } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await Users.find().populate('thoughts');

            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await Users.findOne({ _id: req.params.thoughtId })
                .populate('thought');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a user
    async createUser(req, res) {
        try {
            const user = await Users.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteUser(req, res) {
        try {
            const user = await Users.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                res.status(404).json({ message: 'No user with that ID' });
            }

            await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'user and thoughts deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
