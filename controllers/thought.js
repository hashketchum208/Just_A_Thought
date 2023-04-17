const { User, Thought } = require('../models');

const thoughtController = {
  createThought(req, res) {
    Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
  },
  getThoughts(req, res) {
    Thought.find({})
        .then(async (thoughts) => {
        const thoughtData = {
          thoughts,
        };
        return res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getThoughtId(req, res) {
    Thought.findById({_id: req.params.id})
        .select('-__v')
        .then(async (thought) =>
            !thought
            ? res.status(404).json({message: 'Could not find!'})
            : res.status(200).json(thought)
          )
          .catch((err) => {console.log(err);res.status(500).json(err)});
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {runValidators: true, new: true}
    )
    .then((thought) =>
      !thought
      ? res.status(404).json({message: 'Could not find!'})
      :res.status(200).json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id})
    .then((thought) =>
      !thought
      ? res.status(404).json({message: 'Could not find!'})
      : Thought.deleteMany({ _id: { $in: User.thought } })
    )
    .then(() => res.json({ message: 'Thought has been deleted'}))
    .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;