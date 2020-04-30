require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.User;

exports.signup = async (req, res) => {
  var user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  try {
    var userDoc = await user.save();
    var token = await jwt.sign({id: userDoc._id}, process.env.JWT_SECRET_KEY, { expiresIn: '6h' });
    res.status(200).json({token: token, user: userDoc});
  } catch (err) {
    res.status(500).json({message: err.message || 'Unable to create new user'});
  }
}

exports.login = async (req, res) => {
  try {
    var userDoc = await User.findOne({ username: req.body.username }).exec();
    if(userDoc) {
      if(bcrypt.compareSync(req.body.password, userDoc.password)) {
        var token = await jwt.sign({id: userDoc._id}, process.env.JWT_SECRET_KEY, { expiresIn: '6h' });
        res.status(200).json({token: token, user: userDoc})
      } else {
        res.status(401).json({message: "Invalid login credentials"});
      }
    } else {
      res.status(401).json({message: "Invalid login credentials"});
    }
  } catch (err) {
    res.status(500).json({message: err.message || 'An unexpected error has occurred'})
  }
}