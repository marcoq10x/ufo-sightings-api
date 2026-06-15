const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('sightings').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while retrieving sightings.' });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'You must provide a valid sighting ID to find it.' });
    }
    const sightingId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('sightings').find({ _id: sightingId });
    const lists = await result.toArray();
    if (lists.length === 0) {
        return res.status(404).json({ message: 'Sighting not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while retrieving the sighting.' });
  }
};

const createSighting = async (req, res) => {
  try {
    const sighting = {
      location: req.body.location,
      date: req.body.date,
      shape: req.body.shape,
      description: req.body.description
    };
    const response = await mongodb.getDb().db().collection('sightings').insertOne(sighting);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the sighting.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while creating the sighting.' });
  }
};

const updateSighting = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'You must provide a valid sighting ID to update it.' });
    }
    const sightingId = new ObjectId(req.params.id);
    const sighting = {
      location: req.body.location,
      date: req.body.date,
      shape: req.body.shape,
      description: req.body.description
    };
    const response = await mongodb.getDb().db().collection('sightings').replaceOne({ _id: sightingId }, sighting);
    
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Sighting not found or no changes were made.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while updating the sighting.' });
  }
};

const deleteSighting = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'You must provide a valid sighting ID to delete it.' });
    }
    const sightingId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('sightings').deleteOne({ _id: sightingId });
    
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Sighting not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while deleting the sighting.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createSighting,
  updateSighting,
  deleteSighting
};