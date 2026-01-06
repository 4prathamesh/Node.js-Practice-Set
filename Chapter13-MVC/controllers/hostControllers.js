
const Home = require("../Models/home");

exports.getAddHome = (req, res, next) => {
    res.render('host/edit-home', {'editing': false, pageTitle : 'Add Home To Airbnb', currentPage : 'addHome'});
} 

exports.getEditHome = (req, res, next) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';

    Home.findById(homeId).then(([homes]) =>{
        const home = homes[0];
        if(!home){
            console.log('Home not found!! ');
            return res.redirect('/host/host-home-list');
        }
        res.render('host/edit-home', {home, 'editing':editing, pageTitle : 'Edit Home of Host', currentPage : 'editHome'});
    });
    
} 

exports.postEditHome = (req, res, next) => {
    const {id, houseName, price, location, rating, photoUrl, description} = req.body;
    const home = new Home(houseName, price, location, rating, photoUrl, description, id);
    home.save();

    res.redirect('/host/host-home-list');
} 

exports.postAddHome = (req, res, next) => {
    const {houseName, price, location, rating, photoUrl, description} = req.body;
    const home = new Home(houseName, price, location, rating, photoUrl, description);
    home.save();

    res.redirect('/host/host-home-list');
};

exports.postDeleteHome = (req, res, next) => {
    const homeId = req.params.homeId; 
    console.log('deleted home id - ',homeId);
    Home.deleteById(homeId).then(() =>{
        res.redirect('/host/host-home-list');
    }).catch(error=> {
        console.log('Error while deleting ', error);
    })
    
};

exports.getHostHome = (req, res, next) => {
    Home.fetchAll().then(([registeredHome]) => {
        res.render('host/host-home-list', {registeredHome, pageTitle : 'Host homes list', currentPage : 'host-home'})
    });
}