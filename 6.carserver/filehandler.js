'use strict';
const fs = require('fs');
const path = require('path');

const MIMETYPES = require(path.join(__dirname,'mimetypes.json'));

const read = filepath =>{
    const extension = path.extname(filepath).toLowerCase();
    const mime = MIMETYPES[extension] || {
        type:'application/octet-stream',
        encoding:'binary'
    };

    return new Promise((resolve,reject)=>{
        fs.readFile(filepath, mime.encoding, (err,fileData)=>{
            if(err) {
                reject(err);
            }
            else {
                resolve({fileData, mime})
            }
        });
    });
}

module.exports={read};