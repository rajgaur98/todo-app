
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

mongoose.connect('mongodb://localhost:27017/todolist');

mongoose.connection.on('connected', ()=>{
    console.log('mongodb connected');
});

mongoose.connection.on('error', (error)=>{
    console.log(error);
});

const port = 5000;

app.use(cors());

app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route);

app.get('/', (req, res)=>{
    res.send('hello node!');
});

app.listen(port, ()=>{
    console.log('Server started at port: ' + port);
});

