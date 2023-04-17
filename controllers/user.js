const { User, Thought } = require('../models');

const userController = {
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  getUsers(req, res) {
    User.find({})
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getUserId(req, res) {
    User.findById({ _id: req.params.id })
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Could not find!' })
          : res.status(200).json(user)
      )
      .catch((err) => { console.log(err); res.status(500).json(err) });
  },
  putUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Could not find!' })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Could not find!' })
          : Thought.deleteMany({ _id: { $in: User.thought } })
      )
      .then(() => res.status(200).json({ message: 'User has been deleted'}))
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;