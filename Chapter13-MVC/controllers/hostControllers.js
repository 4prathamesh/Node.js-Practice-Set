
const Home = require("../Models/home");

exports.getAddHome = (req, res, next) => {
    res.render('host/edit-home', {'editing': false, pageTitle : 'Add Home To Airbnb', currentPage : 'addHome'});
} 

exports.getEditHome = (req, res, next) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';

    Home.findById(homeId, (home) =>{
        if(!home){
            console.log('Home not found!! ');
            return res.redirect('host/host-home-list');
        }
        res.render('host/edit-home', {home, 'editing':editing, pageTitle : 'Edit Home of Host', currentPage : 'editHome'});
    });
    
} 

exports.postEditHome = (req, res, next) => {
    const {id, houseName, price, location, rating, photoUrl} = req.body;
    const home = new Home(houseName, price, location, rating, photoUrl);
    home.id=id;
    home.save();

    res.redirect('/host/host-home-list');
} 

exports.postAddHome = (req, res, next) => {
    const {houseName, price, location, rating, photoUrl} = req.body;
    const home = new Home(houseName, price, location, rating, photoUrl);
    home.save();

    res.redirect('/host/host-home-list');
};

exports.postDeleteHome = (req, res, next) => {
    const homeId = req.params.homeId; 
    console.log('deleted home id - ',homeId);
    Home.deleteById(homeId, error =>{
        if(error){
            console.log('errod for deleteding the file - ',error);
        }
        res.redirect('/host/host-home-list');
    })
    
};

exports.getHostHome = (req, res, next) => {
    Home.fatchAll((registeredHome) => res.render('host/host-home-list', {registeredHome, pageTitle : 'Host homes list', currentPage : 'host-home'}));
}