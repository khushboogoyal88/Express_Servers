'use strict';

const path = require('path');
const url = require('url');
const { getPostData } = require('./requesthandler');

module.exports = (basedir, config) => {
    const { read } =
        require(path.join(basedir,
            config.library.folder,
            config.library.filehandler));
    const {
        send,
        sendJson,
        redirectError
    } = require(path.join(basedir,
        config.library.folder,
        config.library.requesthandler));

    const { getCars } = require(path.join(basedir,
        config.storage.folder,
        config.storage.file))(basedir, config.storage);

    const formPath = path.join(basedir, config.FORM);

    return async (req, res) =>{
        const route = decodeURIComponent(url.parse(req.url,true).pathname);
        try{
            if(route==='/form'){
                const resultData = await getPostData(req);
                if(!resultData.licence) {
                    redirectError(res, 'Licence missing');
                }
                else {
                    const car = await getCars('licence', resultData.licence);
                    const resultPage = await read(formPath);
                    if(car.length===0) {
                        resultPage.fileData=resultPage.fileData.replace('**MODEL**','');
                        resultPage.fileData = resultPage.fileData.replace('**LICENCE**', '');
                    }
                    else{
                        resultPage.fileData = resultPage.fileData.replace('**MODEL**', car[0].model);
                        resultPage.fileData = resultPage.fileData.replace('**LICENCE**', car[0].licence);
                    }
                    send(res,resultPage);
                }
            }
            else if (route ==='/jsonencoded'){
                const result = await getPostData(req);
                // console.log(result);
                const car = await getCars('licence',result.licence);
                sendJson(res, car);
            }
            else if (route === '/urlencoded') {
                const result = await getPostData(req);
                // console.log(result);
                const car = await getCars('licence', result.licence);
                sendJson(res, car);
            }
        }
        catch(err) {
            redirectError(res, err.message);
        }
    }

}