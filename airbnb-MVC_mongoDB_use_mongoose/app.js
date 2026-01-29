// External Module
const express = require('express');
const session = require('express-session');
const mongobdStore = require('connect-mongodb-session')(session);
const { default: mongoose } = require('mongoose');
const multer = require('multer');

// Database Path
const DB_PATH = 'mongodb+srv://prathameshroot:root@prathamesh.sofwjiq.mongodb.net/airbnb?appName=Prathamesh';

// Internal Module
const storeRouter = require('./routes/storeRouter');
const  hostRouter = require('./routes/hostRouter');
const { errorControllers } = require('./controllers/errorControllers');
const authRouter = require('./routes/authRouter');

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, 'uploads/');
    },
    filename: function (req, file, cd) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cd(null, uniqueSuffix + '-' + file.originalname);
    }
    
});
const fileFilter = (req, file, cd) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cd(null, true);
    } else {
        cd(null, false);
    }
}

const multerOptions = {storage,fileFilter};

app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));
app.use(multer(multerOptions).single('photo'));
app.set('view engine', 'ejs');
app.set('views', './views');

const store = new mongobdStore({
    uri: DB_PATH,
    collection: 'sessions'
});

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

app.use('/auth', authRouter);
app.use(storeRouter);
app.use('/host', (req, res, next) => {
    if(req.session && req.session.isLoggedIn){
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