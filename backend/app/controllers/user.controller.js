const db = require("../models");
const User = db.user;

exports.getFriends = async (req, res) => {
  User.findOne({
    _id: req.params.id,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    User.find({
      _id: { $in: user.friends },
    }).then((documents) => {
      res.status(200).json({
        message: "Amis trouvés !",
        users: documents,
      });
    });
  });
};

exports.getGhosts = async (req, res) => {
  User.findOne({
    _id: req.params.id,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    user.friends.push(req.params.id);

    User.find({
      _id: { $nin: user.friends },
    }).then((documents) => {
      res.status(200).json({
        message: "Fantômes trouvés !",
        users: documents,
      });
    });
  });
};

exports.update = async (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body.id },
    { role: req.body.role, friends: req.body.friends }
  ).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).send({
        message: "Fantôme inconnu...",
      });
    }

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      role: req.body.role,
      friends: req.body.friends,
    });
  });
};
