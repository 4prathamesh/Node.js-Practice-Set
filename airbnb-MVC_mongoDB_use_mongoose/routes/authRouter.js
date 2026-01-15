const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/authControllers');

// authRouter.get('/signup', authController.getSignup);
// authRouter.post('/signup', authController.postSignup);
authRouter.get('/login', authController.getLogin);
authRouter.post('/login', authController.postLogin);

module.exports = authRouter;