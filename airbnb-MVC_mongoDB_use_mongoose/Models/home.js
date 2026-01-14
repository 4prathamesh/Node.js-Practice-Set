const mongoose = require('mongoose');

const homeSchema = mongoose.Schema({
    houseName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    photoUrl: String,
    description: String,
});

homeSchema.pre('findOneAndDelete', async function(next) {
    const homeId = this.getQuery()._id;
    const Favourite = require('./favourite');

    await Favourite.deleteMany({ homeId: homeId });
    next();
});

module.exports = mongoose.model('Home',homeSchema);
/*

        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
        this.description = description;
            this._id = _id;

            save()

            fetchAll()
            findById(homeId)
            findById(homeId)
            deleteById(homeIds)
*/