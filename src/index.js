const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { mongoose }= require('./database');

const app = express();


//settings
app.set('port',process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/task' ,require('./routes/task.routes'));
app.use('/api/task2' ,require('./routes/task.routes2'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server

app.listen(app.get('port'), () => {
    console.log('server on port 3000');
});

