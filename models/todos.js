const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    label: {
        type: String,
        required: false,
        default: 'other'
    },
    status: {
        type: String,
        required: false,
        default: 'new'
    }
});

const Todo = module.exports = mongoose.model('Todo', TodoSchema);