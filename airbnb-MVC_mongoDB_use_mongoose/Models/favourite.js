
/*


*/


module.exports = class Favourite {

    constructor(homeId){
        this.homeId = homeId;
    }

    save(){
        const db = getDB();
        return db.collection('favourite')
            .findOne({homeId: this.homeId})
            .then( existingFev => {
                if(!existingFev){
                    return db.collection('favourite').insertOne(this);
                }
                return Promise.resolve();
            }
        )
        
    }

    static getFavourites(){
        const db = getDB();
        return db.collection('favourite').find().toArray();
    }

    static deleteById(delHomeId){
        const db= getDB();  
        return db.collection('favourite')
        .deleteOne({homeId: delHomeId});
    }
}