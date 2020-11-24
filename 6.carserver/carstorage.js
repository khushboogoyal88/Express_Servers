'use strict';

const path = require('path');

module.exports = (basedir,config) =>{
    const cars = require(path.join(basedir,config.folder,config.json));

    const getCars = (key,value) =>{
        let found=[];
        if(key && value) {
            for(let car of cars) {
                if(car[key]==value){
                    found.push(car);
                }
            }
        }
        else{
            found=cars;
        }
        return found;
    }

    return {getCars};
}


