
const Favourite = require("../Models/favourite");
const Home = require("../Models/home");

exports.getIndex = (req, res, next) => {
    Home.find().then(registeredHome => {
        res.render( 'store/index' ,{ registeredHome : registeredHome, pageTitle: 'Airbnb Home', currentPage : 'index' })
    }); 
};

exports.getHomes = (req, res, next) => {
    Home.find().then(registeredHome => {
         res.render( 'store/home-list' ,{ registeredHome : registeredHome, pageTitle: 'Home List', currentPage : 'Home' })
        }); 
};

exports.getBookings = (req, res, next) => {
    res.render( 'store/bookings' ,{ pageTitle: 'My Bookings', currentPage : 'bookings' }); 
};

exports.getFavouriteList = (req, res, next) => {
    Favourite.getFavourites().then(favourites => {
        favourites = favourites.map(fav => fav.homeId);
        Home.find().then(registeredHome => {
            const favouriteHomes = registeredHome.filter(home => favourites.includes(home._id.toString())
            );
            res.render( 'store/favourite-list' ,{favouriteHomes, pageTitle: 'My Favourite', currentPage : 'favourite' })
        }); 
    });
};

exports.postAddToFavourite = (req, res, next) => {
    const homeId = req.body.id;
    const fav = new Favourite(homeId);
    fav.save().then(result => {
        console.log('Home Added in to Favourite List ',result);
    }).catch(error => {
        console.log('error come when HOme add to Favourtie ',error);
    }).finally( () =>{
        res.redirect('/favourites');
    })
    
};

exports.postDeleteFavourite = (req, res, next) => {
    const homeId = req.params.homeId; 
    Favourite.deleteById(homeId).then( () => {
        console.log('favourite Home deleted ');
    }).catch( error =>{
        if(error){
            console.log('errod for deleteding favourites the file - ',error);
        }
        
    }).finally( ()=>{
        res.redirect('/favourites');
    })
    
};

exports.getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;

    Home.findById(homeId).then(home => {
        if(!home){
            res.redirect("/home");
        }else{
            res.render( 'store/home-detail' ,{ pageTitle: 'Home Details', currentPage : 'Home', home });
        }
    });
    
};