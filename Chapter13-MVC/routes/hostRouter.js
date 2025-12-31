// External Module
const express = require('express');
const pathDir = require('../utils/pathutils');
const hostRouter = express.Router();

// Local Module
const hostControllers = require('../controllers/hostControllers');

hostRouter.get("/add-home", hostControllers.getAddHome);
hostRouter.post("/add-home", hostControllers.postAddHome); 
hostRouter.get("/host-home-list", hostControllers.getHostHome);

module.exports = hostRouter;
