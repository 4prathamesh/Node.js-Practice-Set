const mongoose = require('mongoose');
const todoItemSchema = mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    date: Date,
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    
},{ timestamps: true }
);

module.exports = mongoose.model("TodoItem", todoItemSchema);