
const Home = require("../Models/home");

exports.getIndex = (req, res, next) => {
    Home.fatchAll((registeredHome) => res.render( 'store/index' ,{ registeredHome : registeredHome, pageTitle: 'Airbnb Home', currentPage : 'index' })); 
};

exports.getHomes = (req, res, next) => {
    Home.fatchAll((registeredHome) => res.render( 'store/home-list' ,{ registeredHome : registeredHome, pageTitle: 'Home List', currentPage : 'Home' })); 
};

exports.getBookings = (req, res, next) => {
    res.render( 'store/bookings' ,{ pageTitle: 'My Bookings', currentPage : 'bookings' }); 
};

exports.getFavouriteList = (req, res, next) => {
    Home.fatchAll((registeredHome) => res.render( 'store/favourite-list' ,{registeredHome, pageTitle: 'My Favourite', currentPage : 'favourite' })); 
};