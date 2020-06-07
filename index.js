
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

mongoose.connect('mongodb+srv://root:root@cluster0-ktwkp.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true } );

mongoose.connection.on('connected', ()=>{
    console.log('mongodb connected');
});

mongoose.connection.on('error', (error)=>{
    console.log(error);
});

const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route); 

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, ()=>{
    console.log('Server started at port: ' + port);
});

