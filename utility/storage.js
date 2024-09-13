// This module deals with directory creation

// Importing modules
const fs = require('fs');
const path = require('path');

// Importing Function Created By track360 Team
const {formatText} = require("./formatText")

function createDirectory(company,gov){
    if(!company || !gov) return null;
    company = formatText(company);
    gov  = formatText(gov);
    const dirPath = path.join(__dirname, '../public/storage', `${company}_${gov}_${getCurrentDate()}`);
    fs.mkdir(dirPath,{recursive:true},(err)=>{
        if(err){
            console.log('Error in directory creation ',err);
            return null;
        }
    });
    return dirPath;
}

function projectDirectory(dir_path,name){
    if(!dir_path) return null;
    name = formatText(name);
    const PATH = `${dir_path}/${name}`;
    fs.mkdir(PATH,{recursive:true},(err)=>{
        if(err){
            console.log(err);
            return null;
        }
    });
    return PATH;
}

function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return dd + mm + yyyy;
}

module.exports = {createDirectory,projectDirectory};