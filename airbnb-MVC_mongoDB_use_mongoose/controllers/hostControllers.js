
const Home = require("../Models/home");

exports.getAddHome = (req, res, next) => {
    res.render('host/edit-home', {'editing': false, pageTitle : 'Add Home To Airbnb', currentPage : 'addHome', isLoggedIn: req.session.isLoggedIn || false, user : req.session.user });
} 

exports.getEditHome = (req, res, next) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';

    Home.findById(homeId).then(home =>{
        if(!home){
            console.log('Home not found!! ');
            return res.redirect('/host/host-home-list');
        }
        res.render('host/edit-home', {home, 'editing':editing, pageTitle : 'Edit Home of Host', currentPage : 'editHome', isLoggedIn: req.session.isLoggedIn || false, user : req.session.user });
    });
    
} 

exports.postEditHome = (req, res, next) => {
    const {id, houseName, price, location, rating, photo, description} = req.body;
    Home.findById(id).then( (home) => {
        home.houseName = houseName;
        home.price = price;
        home.location = location;
        home.rating = rating;
        home.description = description;
        if(req.file){
            home.photo = req.file.path;
        }
        home.save().then(result => {
            console.log('Home updated ', result);
        }).catch(err =>{
            console.log('error while updateding Home ',err);
        }).finally( () => {
            res.redirect('/host/host-home-list');
        })
    }).catch(err =>{
        console.log('error while finding home for updated ',err);
    })
} 

exports.postAddHome = async (req, res, next) => {
    try {
        const { houseName, price, location, rating, description } = req.body;
        if(!req.file){
            console.error('No file uploaded');
            return res.status(400).redirect('/host/add-home'); // Or use flash messages
        }
        const photo = req.file.path;
        const home = new Home({ houseName, price, location, rating, photo, description });
        await home.save();
        console.log('Home Saved Successfully');
        res.redirect('/host/host-home-list');
    } catch (error) {
        console.error('Error saving home:', error);
        res.status(500).redirect('/host/add-home'); // Or use flash messages
    }
};

exports.postDeleteHome = (req, res, next) => {
    const homeId = req.params.homeId; 
    console.log('deleted home id - ',homeId);
    Home.findByIdAndDelete(homeId).then(() =>{
        res.redirect('/host/host-home-list');
    }).catch(error=> {
        console.log('Error while deleting ', error);
    })
    
};

exports.getHostHome = (req, res, next) => {
    Home.find().then((registeredHome) => {
        res.render('host/host-home-list', {registeredHome, pageTitle : 'Host homes list', currentPage : 'host-home', isLoggedIn: req.session.isLoggedIn || false, user : req.session.user })
    });
}