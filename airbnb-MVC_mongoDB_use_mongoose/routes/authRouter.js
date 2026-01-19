const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/authControllers');

authRouter.get('/login', authController.getLogin);
authRouter.post('/login', authController.postLogin);
authRouter.get('/logout', authController.postLogout);
authRouter.get('/Singup', authController.getSingup);
authRouter.post('/Singup', authController.postSingup);

module.exports = authRouter;