'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const server=http.createServer(app);

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'pagetemplates'));

const homePath=path.join(__dirname,'home.html');

app.get('/', (req,res)=>res.sendFile(homePath));

app.post('/login', express.urlencoded({extended:false}),(req,res)=>{
    //the structure of req.body in this case:
    // req.body={
    //     username:"",
    //     password:""
    // }

    res.render('result', {
        header1: 'Your data',
        title:'Form',
        data:req.body});
    
    // res.render('result', {
    //     header1:'Your data',
    //     title:'Form', 
    //     data: {
    //         username:req.body.username, 
    //         password:req.body.password
    //     } 
    // });
})




server.listen(port, host, ()=>console.log(`Server ${host}:${port} running`));