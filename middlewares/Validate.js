const db = require('../models');
const User = db.User;

isUsernameTaken = async (req, res, next) => {
  try {
    const user = await User.findOne({username: req.body.username}).exec();
    if (user) {
      res.status(400).json({message: "That username is already in use please try another."});
      return;
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
  next();
}

const Validate = {
  isUsernameTaken
}

module.exports = Validate;