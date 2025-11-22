const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Players']
  try {
    const result = await mongodb.getDb().db().collection('players').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while retrieving the players.' });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Players']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Must use a valid player id to find a player.' });
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('players').find({ _id: userId });
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        res.status(404).json({ message: 'Player not found' });
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error occurred while retrieving the player.' });
  }
};

const createPlayer = async (req, res) => {
  //#swagger.tags=['Players']
  const player = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    position: req.body.position,
    shirtNumber: req.body.shirtNumber,
    team: req.body.team,
    nationality: req.body.nationality,
    birthYear: req.body.birthYear
  };

  // VALIDATION (Required by Rubric)
  if (!player.firstName || !player.lastName || !player.position || !player.team) {
    res.status(400).send({ message: 'Content can not be empty! First name, Last name, Position and Team are required.' });
    return;
  }

  try {
    const response = await mongodb.getDb().db().collection('players').insertOne(player);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the player.');
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while creating the player.' });
  }
};

const updatePlayer = async (req, res) => {
  //#swagger.tags=['Players']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must use a valid player id to update a player.' });
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const player = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    position: req.body.position,
    shirtNumber: req.body.shirtNumber,
    team: req.body.team,
    nationality: req.body.nationality,
    birthYear: req.body.birthYear
  };

   // VALIDATION
   if (!player.firstName || !player.lastName || !player.position || !player.team) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  try {
    const response = await mongodb.getDb().db().collection('players').replaceOne({ _id: userId }, player);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the player.');
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while updating the player.' });
  }
};

const deletePlayer = async (req, res) => {
  //#swagger.tags=['Players']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must use a valid player id to delete a player.' });
  }
  const userId = new ObjectId(req.params.id);
  
  try {
    const response = await mongodb.getDb().db().collection('players').deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the player.');
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Some error occurred while deleting the player.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createPlayer,
  updatePlayer,
  deletePlayer
};