'use strict';

const http = require('http');
const url = require('url');
const path = require('path');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const { 
    read, 
    send, 
    sendJson, 
    sendError, 
    isIn } = require(path.join(__dirname,'library','handler.js'));

const { 
    getAllFlavors, 
    hasFlavor, 
    getIceCream } = require(path.join(__dirname,'iceCreamStorage','iceCreamFreezer.js'));

const resourceRoutes = ['/favicon', '/styles/', '/js/', '/images/'];

const homePath = path.join(__dirname,'home.html');

const server = http.createServer(async (req,res)=>{
    const route=decodeURIComponent(url.parse(req.url,true).pathname);
    try{
        if(route==='/') {
            const result = await read(homePath);
            send(res, result);
        }
        else if(isIn(route, ...resourceRoutes)) {
            // console.log(route);
            // console.log(path.join(__dirname, route));
            const result = await read(path.join(__dirname,route));
            send(res, result);
        }
        else if(route==='/all') {
            console.log('all');
            const flavors = await getAllFlavors();
            sendJson(res,flavors);
            // sendJson(res, await getAllFlavors());
        }
        else if(route.startsWith('/icecreams/')) { // route= '/icecreams/vanilla'
            const pathParts=route.split('/');
            console.log(pathParts);
            if(pathParts.length>2) {
                const iceCreamFlavor = pathParts[2];
                if( await hasFlavor(iceCreamFlavor)) {
                    const iceCream = await getIceCream(iceCreamFlavor);
                    sendJson(res,iceCream);
                }
                else {
                    sendError(res, 'Ice cream not found',400);
                }
            }
        }
        else {
            sendError(res,'Not found');
        }   
    }
    catch(err) {
        sendError(res,err.message,400);
    }
});

server.listen(port,host,()=>console.log(`Server ${host}:${port} running`));