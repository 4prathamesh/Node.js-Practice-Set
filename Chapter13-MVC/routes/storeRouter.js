
// External Module
const express = require('express');
const storeRouter = express.Router();

// Local module
const storeController = require('../controllers/storeControllers');

storeRouter.get("/", storeController.getIndex ); 
storeRouter.get("/home", storeController.getHomes ); 
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favourites", storeController.getFavouriteList);
storeRouter.get('/home/:homeId', storeController.getHomeDetails);

storeRouter.post("/favourites", storeController.postAddToFavourite);
module.exports = storeRouter;