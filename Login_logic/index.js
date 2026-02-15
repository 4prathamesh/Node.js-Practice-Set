// expernal imports
require('dotenv').config();
const express = require('express');

// internal modlue imports
const connectDB = require('./config/db');
connectDB();

const Router = require('./routes/authRouters');

const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
    res.send('Server is running');
});

app.use('/api/auth', Router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});