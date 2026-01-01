
const Home = require("../Models/home");

exports.getAddHome = (req, res, next) => {
    res.render('host/add-home', {pageTitle : 'Add Home To Airbnb', currentPage : 'addHome'});
} 

exports.postAddHome = (req, res, next) => {
    const {houseName, price, location, rating, photoUrl} = req.body;
    const home = new Home(houseName, price, location, rating, photoUrl);
    home.save();

    res.render('host/home-added', {pageTitle: 'Home Added successfully', currentPage : 'homeAdded'});
};

exports.getHostHome = (req, res, next) => {
    Home.fatchAll((registeredHome) => res.render('host/host-home-list', {registeredHome, pageTitle : 'Host homes list', currentPage : 'host-home'}));
}