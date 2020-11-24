'use strict';

const http = require('http');
const path = require('path');

const config = require('./config.json');
const { redirectError } = 
  require(path.join(__dirname,config.library.folder,'requesthandler.js'));

console.log(path.join(__dirname, config.library.folder,
  config.library.getHandler));

const handleGetRequests = 
  require(path.join(__dirname,config.library.folder,
                    config.library.getHandler))(__dirname,config);

const handlePostRequests =
  require(path.join(__dirname, config.library.folder,
    config.library.postHandler))(__dirname, config);

const server = http.createServer((req,res)=>{
  const method = req.method.toUpperCase();
  if(method==='GET') {
    handleGetRequests(req,res);
  }
  else if(method==='POST') {
    handlePostRequests(req, res);
  }
  else {
    redirectError(res,'Resourse not in use');
  }
});

server.listen(config.port,config.host,
    ()=>console.log(`Server running ${config.host}:${config.port}`));

