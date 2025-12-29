
// External Module
const express = require('express');
const userRouter = express.Router();

// Local module
const { getHomes } = require('../controllers/homes');

userRouter.get("/", getHomes ); 

module.exports = userRouter;