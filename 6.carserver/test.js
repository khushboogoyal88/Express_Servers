'use strict';

const path = require('path');
const config = require('./config.json');

const {getCars} = 
  require(path.join(__dirname,
                    config.storage.folder,
                    config.storage.file))(__dirname,config.storage);

console.log(getCars('licence','ABC-1'));