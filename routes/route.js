
const express = require('express');
const router = express.Router();
const Todo = require('../models/todos');

// retrieving todos
router.get('/todos', (req, res, next)=>{
    if(req.query.label === 'all')
        Todo.find({}).sort({date: 1}).collation({locale: "en_US", numericOrdering: true}).then((todos)=>{
            res.send(todos);
        });
    else
        Todo.find({label: req.query.label}).sort({date: -1}).collation({locale: "en_US", numericOrdering: true}).then((todos)=>{
            res.send(todos);
        });
});

// adding todo
router.post('/todo', (req, res, next)=>{
    var label = req.body.label;
    if(label === 'Choose..' || label === '' || label === null)
        label = 'others';
    let newTodo = new Todo({
        name: req.body.name,
        date: req.body.date,
        label: label
    });
    newTodo.save((error, todo)=>{
        if(error){
            res.json({'response': 'Todo creation failed', error});
        }
        else{
            res.json(todo);
        }
    });
});

// updating todo
router.put('/todo/:id', (req, res)=>{
    Todo.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (error, todo)=>{
        if(error){
            res.json(error);
        }
        else{
            res.json(todo);
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
