
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
    Favourite.find().then(favourites => {
        favourites = favourites.map(fav => fav.houseId.toString());
        Home.find().then(registeredHome => {
            const favouriteHomes = registeredHome.filter(home => favourites.includes(home._id.toString())
            );
            res.render( 'store/favourite-list' ,{favouriteHomes, pageTitle: 'My Favourite', currentPage : 'favourite' })
        }); 
    });
};

exports.postAddToFavourite = (req, res, next) => {
    const homeId = req.body.id;
    console.log('Home ID to add to favourite:', homeId);
    Favourite.findOne({ houseId: homeId }).then(existingFav => {
        if (existingFav) {
            console.log('Home is already in Favourite List');
            
        }else {
            fav = new Favourite({ houseId: homeId });
            fav.save().then(result => {
                console.log('Home Added in to Favourite List ',result);
            });
        }
        return res.redirect('/favourites');
    }).catch(err => {
        
        console.log('Error checking existing favourite:', err);
    });
    
};

exports.postDeleteFavourite = (req, res, next) => {
    const homeId = req.params.homeId; 
    Favourite.findOneAndDelete({ houseId: homeId }).then( () => {
        console.log('favourite Home deleted ');
    }).catch( error =>{
        if(error){
            console.log('error for deleting favourites the file - ',error);
        }
        
    }).finally( ()=>{
        res.redirect('/favourites');
    })
    
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
            res.render( 'store/home-detail' ,{ pageTitle: 'Home Details', currentPage : 'Home', home });
        }
    }).catch(err => {
        console.log('Error finding home:', err);
        res.redirect("/home");
    });
    
};