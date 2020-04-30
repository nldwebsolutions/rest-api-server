require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.User;

exports.findAll = async (req, res) => {
  try {
    const userDocs = await User.find().exec();
    res.status(200).json(userDocs);
  } catch (err) {

  }
}