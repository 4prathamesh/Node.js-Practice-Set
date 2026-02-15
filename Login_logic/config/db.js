const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDb');
    } catch (error) {
        console.log('Error connecting to Mongodb', error);
        process.exit(1);
    }
}

module.exports = connectDB;