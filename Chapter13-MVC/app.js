// External Module
const express = require('express');
const storeRouter = require('./routes/storeRouter');
const  hostRouter = require('./routes/hostRouter');
const { errorControllers } = require('./controllers/errorControllers');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

app.use(express.urlencoded()); 

app.use(storeRouter);
app.use('/host',hostRouter);
app.use(errorControllers);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
}); 