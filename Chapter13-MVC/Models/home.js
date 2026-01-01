// Core module
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathutils');


const homeDataPath = path.join(rootDir,'data','homes.json');

module.exports = class Home {
    constructor(houseName, price, location, rating, photoUrl){
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
    }

    save(){
        this.id = Math.random().toString();
        Home.fatchAll((registeredHome) => {
            registeredHome.push(this);
            fs.writeFile(homeDataPath, JSON.stringify(registeredHome), error => {
                console.log('File Writing concluded', error);
            })
        })
        
    }

    static fatchAll(callback){
        fs.readFile(homeDataPath, (err, data) => {
            console.log("File read: ", err, data);
            if(!err){
                callback(JSON.parse(data));   
            }else{
                callback([]) ;
            }
            
        });
        
    }

    static findById(homeId, callback){
        this.fatchAll(homes => {
            const homeFound = homes.find(home => home.id === homeId);
            callback(homeFound);
        })
    }
}