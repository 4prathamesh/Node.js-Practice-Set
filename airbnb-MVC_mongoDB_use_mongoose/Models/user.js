const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"]
    },
    lastName: String,
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: ['host', 'guest']
    },
    terms: {
        type: Boolean,
        required: [true, "Terms must be accepted"]
    },
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Home'
    }]
})

module.exports = mongoose.model('User', userSchema);