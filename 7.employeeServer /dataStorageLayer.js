'use strict';

const path = require('path');
const fs=require('fs').promises;

const storageConfig=require('./storageConfig.json');
const storageFile = path.join(__dirname, storageConfig.storageFile);

//wrapper function
function createDataStorage(){
    const {CODES,MESSAGES}=require(path.join(__dirname,storageConfig.errorCodes));

    //private API

    async function readStorage(){
        try{
            const data = await fs.readFile(storageFile,'utf8');
            return JSON.parse(data);
        }
        catch(err) {
            return [];
        }
    }

    async function writeStorage(data){
        try{
            await fs.writeFile(storageFile, JSON.stringify(data, null,4),{encoding:'utf8', flag:'w'});
            return MESSAGES.WRITE_OK();

        }
        catch(err) {
            return MESSAGES.WRITE_ERROR(err.message);
        }
    }

    async function getFromStorage(id) {
        return (await readStorage()).find(employee =>employee.employeeId==id) || null;
    }

    async function addToStorage(newEmployee){
        const storage = await readStorage();
        if(storage.find(employee=>employee.employeeId == newEmployee.employeeId)) {
            return false;
        }
        else {
            storage.push({
                employeeId: +newEmployee.employeeId,
                firstname: newEmployee.firstname,
                lastname:newEmployee.lastname,
                department: newEmployee.department,
                salary: +newEmployee.salary
            });
            await writeStorage(storage);
            return true;
            //with checks
            //version 1:
            // return (await writeStorage(storage)).code===CODES.WRITE_OK; 
            //version 2:
            // const writeResult=await writeStorage(storage);
            // if(writeResult.code === CODES.WRITE_OK){
            //     return true
            // }
            // else {
            //     return false;
            // }
        }
    }

    //more to come

    class Datastorage{
        get CODES() {
            return CODES;
        }

        getAll() {
            return readStorage();
        }

        get(id){
            return new Promise(async (resolve,reject) =>{
                if(!id) {
                    reject(MESSAGES.NOT_FOUND('<empty id>'));
                }
                else {
                    const result = await getFromStorage(id);
                    if(result) {
                        resolve(result);
                    }
                    else{
                        reject(MESSAGES.NOT_FOUND(id));
                    }
                }
            });
        }
        insert(employee){
            return new Promise(async (resolve,reject)=>{
                if(!(employee && employee.employeeId &&
                     employee.firstname && employee.lastname)){
                         reject(MESSAGES.NOT_INSERTED());
                }
                else{
                    if( await addToStorage(employee)) {
                        resolve(MESSAGES.INSERT_OK(employee.employeeId));
                    }
                    else {
                        reject(MESSAGES.ALREADY_IN_USE(employee.employeeId));
                    }
                }
            });
        }

    } // class end

    return new Datastorage();

} //wrapper end

module.exports = {
    createDataStorage
}