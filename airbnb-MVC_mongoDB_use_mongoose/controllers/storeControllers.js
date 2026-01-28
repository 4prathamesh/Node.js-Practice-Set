
// const Favourite = require("../Models/favourite");
const Home = require("../Models/home");
const User = require("../Models/user");
exports.getIndex = (req, res, next) => {
    Home.find().then(registeredHome => {
        res.render( 'store/index' ,{ registeredHome : registeredHome, pageTitle: 'Airbnb Home', currentPage : 'index', isLoggedIn: req.session.isLoggedIn || false, user : req.session.user ?? '' })
    }); 
};

exports.getHomes = (req, res, next) => {
    Home.find().then(registeredHome => {
         res.render( 'store/home-list' ,{ registeredHome : registeredHome, pageTitle: 'Home List', currentPage : 'Home', isLoggedIn: req.session.isLoggedIn , user : req.session.user })
        }); 
};

exports.getBookings = (req, res, next) => {
    res.render( 'store/bookings' ,{ pageTitle: 'My Bookings', currentPage : 'bookings', isLoggedIn: req.session.isLoggedIn || false, user : req.session.user  }); 
};

exports.getFavouriteList = async (req, res, next) => {
    const userId = req.session.user._id;
    const user = await User.findById(userId).populate('favourites');
    res.render( 'store/favourite-list' ,
    {
        favouriteHomes: user.favourites, 
        pageTitle: 'My Favourite', 
        currentPage : 'favourites' , 
        isLoggedIn: req.session.isLoggedIn || false,
        user : req.session.user 
    });
};

exports.postAddToFavourite = async (req, res, next) => {
    const homeId = req.body.id;
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    if(!user.favourites.includes(homeId)){
        user.favourites.push(homeId);
        await user.save();
    }
    res.redirect('/favourites');
    
};

exports.postDeleteFavourite = async (req, res, next) => {
    const homeId = req.params.homeId; 
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    if(user.favourites.includes(homeId)){
        user.favourites = user.favourites.filter( favId => favId != homeId );
        await user.save();
    }

    res.redirect('/favourites');
    
};

exports.getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;

    // Check if homeId is a valid ObjectId
    if (!homeId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.redirect("/home");
    }

    Home.findById(homeId).then(home => {
        if(!home){
            res.redirect("/home");
        }else{
            res.render( 'store/home-detail' ,{ pageTitle: 'Home Details', currentPage : 'Home', home , isLoggedIn: req.session.isLoggedIn || false , user : req.session.user });
        }
    }).catch(err => {
        console.log('Error finding home:', err);
        res.redirect("/home");
    });
    
};