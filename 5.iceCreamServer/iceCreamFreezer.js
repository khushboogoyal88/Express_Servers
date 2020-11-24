'use strict';

const path = require('path');

const {read} = require('../library/handler'); //not nice

const jsonPath = path.join(__dirname,'iceCream.json');

const getAllFlavors = async () =>{
    try{
        const data = await read(jsonPath);
        const iceCreams = await JSON.parse(data.fileData);
        return Object.keys(iceCreams);
    }
    catch(err) {
        return [];
    }
}

const hasFlavor = async flavor =>{
    try{
        const data = await read(jsonPath); //{fileData, mime}
        const iceCreams = JSON.parse(data.fileData);
        return Object.keys(iceCreams).includes(flavor);
        // return Object.keys(iceCreams)
        //     .map(iceCreamFlavor=>iceCreamFlavor.toLowerCase()).includes(flavor.toLowerCase())
    }
    catch(err) {
        return false;
    }
}

const getIceCream = async flavor =>{
    try{
        const data = await read(jsonPath);
        const iceCreams = JSON.parse(data.fileData);
        return iceCreams[flavor] || null;

    }
    catch(err) {
        return null;
    }
}


module.exports={getAllFlavors, hasFlavor, getIceCream}

//some tests

// getAllFlavors().then(flavors=>console.log(flavors));
//hasFlavor('vanilla').then(result=>console.log(result)).catch(err=>console.log(err));

// getIceCream('vanilla').then(iceCream=>console.log(iceCream)).catch(err=>console.log(err));