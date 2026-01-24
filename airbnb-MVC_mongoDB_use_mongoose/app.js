// External Module
const express = require('express');
const session = require('express-session');
const mongobdStore = require('connect-mongodb-session')(session);
const DB_PATH = 'mongodb+srv://prathameshroot:root@prathamesh.sofwjiq.mongodb.net/airbnb?appName=Prathamesh';

// Internal Module
const storeRouter = require('./routes/storeRouter');
const  hostRouter = require('./routes/hostRouter');
const { errorControllers } = require('./controllers/errorControllers');
const { default: mongoose } = require('mongoose');
const authRouter = require('./routes/authRouter');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

const store = new mongobdStore({
    uri: DB_PATH,
    collection: 'sessions'
});

app.use(express.urlencoded({ extended: true })); 
app.use(session({
    secret:'my_secret_key_prat',
    resave: false,
    saveUninitialized: true,
    store
}));

app.use((req, res, next) => {
    console.log(`URL: ${req.url}, Method: ${req.method}, Referrer: ${req.get('Referrer') || 'None'}`);
    next();
});
 
app.use((req, res, next) => {
    const isLoggedIn = req.session ? req.session.isLoggedIn : false; 
    console.log('isLoggedIn Session:', isLoggedIn);
    req.isLoggedIn = isLoggedIn;
    req.user = req.session ? req.session.user : null;
    next();
});

app.use('/auth', authRouter);
app.use(storeRouter);
app.use('/host', (req, res, next) => {
    if(req.isLoggedIn){
        next();
    }else{
        return res.redirect('/auth/login');
    }
});
app.use('/host',hostRouter);
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