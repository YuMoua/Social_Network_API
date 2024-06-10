const { Thoughts, Users } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await Users.find();

            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await Users.findOne({ _id: req.params.userId })
                .populate('user');

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
            console.log(user);
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

            if (user.thoughts.length) {
                await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
            }

            await user.remove();
            res.json({ message: 'user and thoughts deleted!' });
            console.log('User has been deleted')
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // updates a user
    async updateUser(req, res) {
        try {
            const user = await Users.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
