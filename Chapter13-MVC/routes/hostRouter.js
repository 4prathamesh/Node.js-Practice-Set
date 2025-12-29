// External Module
const express = require('express');
const pathDir = require('../utils/pathutils');
const hostRouter = express.Router();

// Local Module
const { getAddHome, postAddHome } = require('../controllers/homes');

hostRouter.get("/add-home", getAddHome);
hostRouter.post("/add-home", postAddHome); 

exports.hostRouter = hostRouter;
