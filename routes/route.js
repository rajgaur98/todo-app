
const express = require('express');
const router = express.Router();
const Todo = require('../models/todos');

// retrieving todos
router.get('/todos', (req, res, next)=>{
    Todo.find((error, todos)=>{
        res.json(todos);
    });
});

// adding todo
router.post('/todo', (req, res, next)=>{
    let newTodo = new Todo({
        name: req.body.name,
        date: req.body.date
    });
    newTodo.save((error, todo)=>{
        if(error){
            res.json({'response': 'Todo creation failed'});
        }
        else{
            res.json({'response': 'Todo created'});
        }
    });
});

// deleting todo
router.delete('/todo/:id', (req, res, next)=>{
    Todo.remove({_id: req.params.id}, (error, result)=>{
        if(error){
            res.json({'response': 'Deletion failed'});
        }
        else{
            res.json({'response': 'Todo deleted'});
        }
    });
});

module.exports = router;
