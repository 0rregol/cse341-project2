const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Teams']
  try {
    const result = await mongodb.getDb().db().collection('teams').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while retrieving the teams.' });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Teams']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Must use a valid team id to find a team.' });
    }
    const teamId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('teams').find({ _id: teamId });
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        res.status(404).json({ message: 'Team not found' });
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error occurred while retrieving the team.' });
  }
};

const createTeam = async (req, res) => {
  //#swagger.tags=['Teams']
  const team = {
    name: req.body.name,
    city: req.body.city,
    stadium: req.body.stadium,
    foundedYear: req.body.foundedYear,
    coach: req.body.coach
  };

  // VALIDATION
  if (!team.name || !team.city) {
    res.status(400).send({ message: 'Content can not be empty! Name and City are required.' });
    return;
  }

  try {
    const response = await mongodb.getDb().db().collection('teams').insertOne(team);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the team.');
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while creating the team.' });
  }
};

const updateTeam = async (req, res) => {
  //#swagger.tags=['Teams']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must use a valid team id to update a team.' });
  }
  const teamId = new ObjectId(req.params.id);
  const team = {
    name: req.body.name,
    city: req.body.city,
    stadium: req.body.stadium,
    foundedYear: req.body.foundedYear,
    coach: req.body.coach
  };

  // VALIDATION
  if (!team.name || !team.city) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  try {
    const response = await mongodb.getDb().db().collection('teams').replaceOne({ _id: teamId }, team);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the team.');
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while updating the team.' });
  }
};

const deleteTeam = async (req, res) => {
  //#swagger.tags=['Teams']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must use a valid team id to delete a team.' });
  }
  const teamId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().db().collection('teams').deleteOne({ _id: teamId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the team.');
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while deleting the team.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createTeam,
  updateTeam,
  deleteTeam
};