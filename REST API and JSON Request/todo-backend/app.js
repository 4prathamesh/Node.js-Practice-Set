// External Module
const express = require('express');
const { default: mongoose } = require('mongoose');

// Database Path
const DB_PATH = 'mongodb+srv://prathameshroot:root@prathamesh.sofwjiq.mongodb.net/todo?appName=Prathamesh';

// Internal Module
const errorControllers = require('./controllers/error-controllers');

const app = express();

app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));

app.use(errorControllers);

const PORT = 3000;

mongoose.connect(DB_PATH).then( () =>{
    console.log('mongodb conndec ');
    app.listen(PORT, () => {
        console.log(`Server running on address http://localhost:${PORT}`);
    }); 
}).catch( err => {
    console.log('Error while connecded ',err);
});