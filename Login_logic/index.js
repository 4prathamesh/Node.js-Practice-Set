// expernal imports
const express = require('express');

// internal modlue imports
connectDB = require('./config/db');
connectDB();

const Router = require('./routes/authRouters');

const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
    res.send('Server is running');
});

app.use('/api/auth', Router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});