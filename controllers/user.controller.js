require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.User;

exports.findAll = async (req, res) => {
  try {
    var userDocs = await User.find().exec();
    res.status(200).json(userDocs);
  } catch (err) {
    res.status(500).json({message: err.message || "An uknown error occurred"});
  }
}

exports.findOne = async (req, res) => {
  let id = req.params.id;
  try {
    var userDoc = await User.find({ _id: id }).exec();
    res.status(200).json(userDoc);
  } catch (err) {
    res.status(500).json({ message: "Invalid User ID" });
  }
}

exports.update = async (req, res) => {
  let id = req.params.id;
  try {
    var userDoc = await User.updateOne({ _id: id }, req.body);
    res.status(200).json({ message: "User updated" });
  } catch (err) {
    res.status(500).json({ message: "Unable to update User" });
  }
}

exports.delete = async (req, res) => {
  let id = req.params.id;
  try {
    await User.deleteOne({ _id: id });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
}