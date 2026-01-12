// External Module
const express = require('express');
const storeRouter = require('./routes/storeRouter');
const  hostRouter = require('./routes/hostRouter');
const { errorControllers } = require('./controllers/errorControllers');
const { default: mongoose } = require('mongoose');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

app.use(express.urlencoded({ extended: true })); 

app.use(storeRouter);
app.use('/host',hostRouter);
app.use(errorControllers);

const PORT = 3000;
const DB_PATH = 'mongodb+srv://prathameshroot:root@prathamesh.sofwjiq.mongodb.net/airbnb?appName=Prathamesh';

mongoose.connect(DB_PATH).then( () =>{
    console.log('mongodb conndec ');
    app.listen(PORT, () => {
        console.log(`Server running on address http://localhost:${PORT}`);
    }); 
}).catch( err => {
    console.log('Error while connecded ',err);
});