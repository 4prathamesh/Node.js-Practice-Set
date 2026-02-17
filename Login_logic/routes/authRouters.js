const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const Router = express.Router();

const { register, login } = require("../controllers/authController");
const { JsonWebTokenError } = require("jsonwebtoken");

Router.post('/register', register);
Router.post('/login', login);

Router.get('/profile', authMiddleware, (req, res, next) => {
    return res.json({
        success: true,
        message: 'This is the profile route',
        user: req.user,
    });
});

Router.get('/google', passport.authenticate("google", { scope: ['profile', 'email'] }));
Router.get(
    '/google/callback', 
    passport.authenticate(
        "google", 
        { session: false }
    ), 
    (req, res, next) => {
        // Generate JWT token
        const token = jwt.sign(
            { id: req.user._id,},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            success: true,
            message: 'Google authentication successful',
            token,
        });

    }
);

module.exports = Router; 