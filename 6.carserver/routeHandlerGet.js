'use strict';

const path = require('path');
const url = require('url');

module.exports = (basedir,config) =>{
    const { read } = 
        require(path.join(  basedir, 
                            config.library.folder,
                            config.library.filehandler));
    const { 
        send, 
        sendJson, 
        isIn, 
        redirectError
    } = require(path.join(  basedir, 
                            config.library.folder, 
                            config.library.requesthandler));
    
    const {getCars} = require(path.join(basedir, 
                              config.storage.folder,
                              config.storage.file))(basedir,config.storage);

    const menuPath=path.join(basedir,config.MENU);
    const errorPagePath=path.join(  basedir, config.ERRORPAGE);
    const formPath=path.join(basedir, config.FORM);
    const pagePaths =`/${config.webpages.folder}/`;

    return async (req,res) =>{
        const route = decodeURIComponent(url.parse(req.url,true).pathname);
        try{
            if(route==='/') {
                send(res, await read(menuPath));
            }
            else if(route==='/getAll') {
                sendJson(res, getCars());
            }
            else if(route==='/form') {
                const result = await read(formPath);
                result.fileData=result.fileData.replace('**MODEL**','');
                result.fileData=result.fileData.replace('**LICENCE**','');
                //result.fileData = result.fileData.replace(/\*\*[A-Z]+\*\*/g, '');
                send(res, result);
            }
            else if (isIn(route, ...config.resourcePaths, pagePaths)) {
                send(res, await read(path.join(basedir,route)));
            }
            else if(route==='/error') {
                const message = url.parse(req.url,true).query.message;
                const result = await read(errorPagePath);
                result.fileData=result.fileData.replace('**MESSAGE**',message);
                send(res,result);
            }
        }
        catch(err) {
            // console.log(err)
            // res.end();
            redirectError(res,'Not found');
        }
    }

}