'use strict';

const {read} = require('./library/handler.js');

const filePath='./testHandler.js';

// read(filePath)
//     .then(result=>console.log(result))
//     .catch(err=>console.log(err));

// read(filePath)
//     .then(result => console.log(result.fileData,result.mime))
//     .catch(err => console.log(err));

read('./iceCreamStorage/iceCream.json')
    .then(result => console.log(result.fileData, result.mime))
    .catch(err => console.log(err));
