const { Thoughts, Users } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thoughts.find();
      
      res.json(thought);
      console.log(thought);
      
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thoughts.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thoughts.create(req.body);
      const user = await Users.findById(req.body.username);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.thoughts.push(thought._id);
      await user.save();

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
,
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      if (thought.username) { 
        await Users.findByIdAndUpdate(
          thought.username,
          { $pull: { thoughts: thought._id } }, 
          { new: true }
        );
      }

      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      console.error("Error deleting thought:", err);
      res.status(500).json(err);
    }
  }
,
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
