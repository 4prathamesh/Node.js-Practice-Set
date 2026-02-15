const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
// require('dotenv').config();

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            email,
            password: hashedPassword,
        });
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',

        });
    } catch (error) {
        console.log('Error in register controller', error);
        return res.status(500).json({
            success: false,
            message: 'Error in register Controller',
        });
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password',
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password',
            });
        }
        const token = jwt.sign( 
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1s' }
            );

        return res.status(200).json({
            success: true,
            message: 'User Logged in successfully',
            token,
        });

    } catch (error) {
        console.log('Error in login controller', error);
        return res.status(500).json({
            success: false,
            message: 'Error in login Controller',
        });
    }
}