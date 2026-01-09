 
const Favourite = require('./favourite');
const { getDB } = require('../utils/databaseUtil');
const { ObjectId } = require('mongodb');

module.exports = class Home {
    constructor(houseName, price, location, rating, photoUrl, description, _id){
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
        this.description = description;
        if(_id){
            this._id = _id;
        }
    }

    save(){
        const db = getDB();
        if(this._id){
            const updateFields = {
                houseName: this.houseName, price: this.price, location: this.location, rating: this.rating, photoUrl: this.photoUrl, description: this.description
            };
            return db.collection().updateOne({_id: new ObjectId(String(this._id))},{$set: updateFields});
        } else{
            return db.collection('homes').insertOne(this); 
        }
        
    }

    static fetchAll(){
        const db= getDB();   
        // find() they give as curser , when we use toArry they give as all data
        return db.collection('homes').find().toArray();
    }

    static findById(homeId){
        const db= getDB();  
        return db.collection('homes')
        .find({_id: new ObjectId(String(homeId))}).next();
    }

    static async deleteById(homeIds){
        const houseId = new ObjectId(String(homeIds));
        const db= getDB();  

        await db.collection('favorite').deleteMany({
             homeId: houseId
        });
        return db.collection('homes')
                .deleteOne({_id: houseId});
        
    }
    
}  