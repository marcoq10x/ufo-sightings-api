const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('users').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error getting users.' });
  }
};

const getSingleUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'You must provide a valid user ID.' });
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('users').find({ _id: userId });
    const lists = await result.toArray();
    
    if (lists.length === 0) {
        return res.status(404).json({ message: 'User not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error getting user.' });
  }
};

const createUser = async (req, res) => {
  try {
    const user = {
      username: req.body.username,
      githubId: req.body.githubId,
      displayName: req.body.displayName,
      profileUrl: req.body.profileUrl
    };
    const response = await mongodb.getDb().db().collection('users').insertOne(user);
    
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Error creating user.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error creating user.' });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'You must provide a valid user ID.' });
    }
    const userId = new ObjectId(req.params.id);
    const user = {
      username: req.body.username,
      githubId: req.body.githubId,
      displayName: req.body.displayName,
      profileUrl: req.body.profileUrl
    };
    
    const response = await mongodb.getDb().db().collection('users').replaceOne({ _id: userId }, user);
    
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found or no changes made.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error updating user.' });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'You must provide a valid user ID.' });
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('users').deleteOne({ _id: userId });
    
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error deleting user.' });
  }
};

module.exports = { getAllUsers, getSingleUser, createUser, updateUser, deleteUser };