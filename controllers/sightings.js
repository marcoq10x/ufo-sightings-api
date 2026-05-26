const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('sightings').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const sightingId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('sightings').find({ _id: sightingId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createSighting = async (req, res) => {
  try {
    const sighting = {
      location: req.body.location,
      shape: req.body.shape,
      durationMinutes: req.body.durationMinutes,
      description: req.body.description,
      isDebunked: req.body.isDebunked
    };
    const result = await mongodb.getDb().db().collection('sightings').insertOne(sighting);
    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result.error || 'Error occurred while reporting the sighting.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateSighting = async (req, res) => {
  try {
    const sightingId = new ObjectId(req.params.id);
    const sighting = {
      location: req.body.location,
      shape: req.body.shape,
      durationMinutes: req.body.durationMinutes,
      description: req.body.description,
      isDebunked: req.body.isDebunked
    };
    const result = await mongodb.getDb().db().collection('sightings').replaceOne({ _id: sightingId }, sighting);
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || 'Error occurred while updating the sighting.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteSighting = async (req, res) => {
  try {
    const sightingId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('sightings').deleteOne({ _id: sightingId });
    if (result.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(result.error || 'Error occurred while deleting the sighting.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createSighting, updateSighting, deleteSighting };