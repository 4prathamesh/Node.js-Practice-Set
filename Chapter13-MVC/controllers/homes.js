
const Home = require("../Models/home");

exports.getAddHome = (req, res, next) => {
    res.render('addHome', {pageTitle : 'Add Home To Airbnb', currentPage : 'addHome'});
} 

exports.postAddHome = (req, res, next) => {
    console.log(req.body);
    const {houseName, price, location, rating, photoUrl} = req.body;
    const home = new Home(houseName, price, location, rating, photoUrl);
    home.save();

    res.render('homeAdded', {pageTitle: 'Home Added successfully', currentPage : 'homeAdded'});
};

exports.getHomes = (req, res, next) => {
    Home.fatchAll((registeredHome) => res.render( 'home' ,{ registeredHome : registeredHome, pageTitle: 'Airbnb Home', currentPage : 'Home' })); 
};
