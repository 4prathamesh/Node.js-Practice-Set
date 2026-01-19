const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/authControllers');

authRouter.get('/login', authController.getLogin);
authRouter.post('/login', authController.postLogin);
authRouter.get('/logout', authController.postLogout);
authRouter.get('/singup', authController.getSingup);
authRouter.post('/singup', authController.postSingup);

module.exports = authRouter;