const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const Router = express.Router();

const { register, login } = require("../controllers/authController")

Router.post('/register', register);
Router.post('/login', login);

Router.get('/profile', authMiddleware, (req, res, next) => {
    return res.json({
        success: true,
        message: 'This is the profile route',
        user: req.user,
    });
});

module.exports = Router; 