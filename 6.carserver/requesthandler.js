'use strict';

//resource in an object of format: {fileData:data, mime.mimeData}
const send = (res, resource) => {
    res.writeHead(200, {
        'Content-Type': resource.mime.type,
        'Content-Length': Buffer.byteLength(resource.fileData,
            resource.mime.encoding)
    });
    res.end(resource.fileData, resource.mime.encoding);
}

const sendJson = (res, jsonResource) => {
    const jsonData = JSON.stringify(jsonResource);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(jsonData);
}

const sendError = (res, message, code = 404) => {
    res.writeHead(code, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message }));
}

const redirectError = (res, message) => {
    res.writeHead(303, { 'Location': `/error?message=${message}` });
    res.end();
}

const isIn = (route, ...routes) => {
    for (let start of routes) {
        if (route.startsWith(start)) return true;
    }
    return false;
}

const getPostData = req => new Promise((resolve,reject)=>{
    const contentType = req.headers['content-type'];
    let parse;
    if(contentType==='application/x-www-form-urlencoded') {
        parse = require('querystring').parse;
    }
    else if(contentType==='application/json') {
        parse = JSON.parse;
    }
    else {
        reject('Wrong Content-Type');
    }

    let databuffer=[];
    req.on('data', messageFragment=>databuffer.push(messageFragment));
    req.on('end', ()=>resolve(parse(Buffer.concat(databuffer).toString())));
    req.on('error', ()=> reject('Error during the data transfer'));
});

module.exports = { send, sendJson, sendError, isIn, getPostData, redirectError };