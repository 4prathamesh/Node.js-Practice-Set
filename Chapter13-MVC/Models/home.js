// Core module
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathutils');

module.exports = class Home {
    constructor(houseName, price, location, rating, photoUrl){
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
    }

    save(){
        Home.fatchAll((registeredHome) => {
            registeredHome.push(this);
            const homeDataPath = path.join(rootDir,'data','homes.json');
            fs.writeFile(homeDataPath, JSON.stringify(registeredHome), error => {
                console.log('File Writing concluded', error);
            })
        })
        
    }

    static fatchAll(callback){
        const homeDataPath = path.join(rootDir,'data','homes.json');
        fs.readFile(homeDataPath, (err, data) => {
            console.log("File read: ", err, data);
            if(!err){
                callback(JSON.parse(data));   
            }else{
                callback([]) ;
            }
            
        });
        
    }
}