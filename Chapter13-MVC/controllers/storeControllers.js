
const Favourite = require("../Models/favourite");
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
    Favourite.getFavourites(favourites => {
        Home.fatchAll((registeredHome) => { 
            const favouriteHomes = registeredHome.filter(home => favourites.includes(home.id));
            res.render( 'store/favourite-list' ,{favouriteHomes, pageTitle: 'My Favourite', currentPage : 'favourite' })
        }); 
    });
    
};

exports.postAddToFavourite = (req, res, next) => {
    console.log('Come to add Favourite List');
    Favourite.addToFavourite(req.body.id, error => {
        if(error){
            console.log("Error while marking favourite",error);
        }
    });
    res.redirect('/favourites');
};

exports.postDeleteFavourite = (req, res, next) => {
    const homeId = req.params.homeId; 
    console.log('deleted favourite home id - ',homeId);
    Favourite.deleteById(homeId, error =>{
        if(error){
            console.log('errod for deleteding favourites the file - ',error);
        }
        res.redirect('/favourites');
    })
    
};

exports.getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;

    Home.findById(homeId, home => {
        if(!home){
            res.redirect("/home");
        }else{
            res.render( 'store/home-detail' ,{ pageTitle: 'Home Details', currentPage : 'Home', 'home': home });
        }
    });
    
};