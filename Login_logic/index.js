// expernal imports
require('dotenv').config();
const express = require('express');
const session = require('express-session');

// internal modlue imports
const connectDB = require('./config/db');
connectDB();
const passport = require('./config/passport');

const Router = require('./routes/authRouters');

const app = express();

app.use(express.json());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => {
    res.send('Server is running');
});

app.use('/api/auth', Router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});