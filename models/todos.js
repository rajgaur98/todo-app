const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const Todo = module.exports = mongoose.model('Todo', TodoSchema);