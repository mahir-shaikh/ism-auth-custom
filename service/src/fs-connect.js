var fsConnect = {};
module.exports = fsConnect;

// const multer = require('multer');
const uploadFolder = 'uploads/';
const fs = require('fs');
const path = require("path")

// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, imageUploadFolder);
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// });

// let upload = multer({
//     storage: storage
// });


// let upload = multer({dest: uploadFolder})

// fs.readdir(uploadFolder, (err, files) => {
//     files.forEach(file => {
//         console.log(file);
//     });
// });

// TODO: Make promise
fsConnect.createDirectory = function (name) {
    let dir = path.join(uploadFolder, name);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// TODO: Make promise
fsConnect.createSubDirectory = function (name, dirName) {
    let dir = path.join(uploadFolder, dirName, name);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }
}

// TODO: Make promise
fsConnect.deleteDirectory = function (dirName) {
    let dir = path.join(uploadFolder, dirName)

    if (fs.existsSync(dir)) {
        fs.rmdirSync(dir, {recursive: true})
    } else {
        console.log("Directory path not found.")
    }
}

// TODO: Make promise
fsConnect.deleteSubDirectory = function (name, dirName) {
    let dir = path.join(uploadFolder, dirName, name)
    console.log("1:", dir)
    if (fs.existsSync(dir)) {
        console.log("2:", dir)
        fs.rmdirSync(dir, { recursive: true });
    } else {
        console.log("Directory path not found:", dir)
    }
}

fsConnect.createNewConfig = function(name, dirName){
    let dir = path.join(uploadFolder, dirName, name);
    // Create a Sub Directory if it does not exists
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }

    // Create a empty json config file in the sub directory
    file = path.join(dir, 'config.json')
    return writeFile(JSON.stringify({}), file)
}


fsConnect.getConfig = function(username, projectname){
    let dir = path.join(uploadFolder, username, projectname);

    // Create a empty json config file in the sub directory
    let file = path.join(dir, 'config.json')
    return readFile(file, true)
}

fsConnect.setConfig = function(username, projectname, jsonData){
    let dir = path.join(uploadFolder, username, projectname);

    // Create a empty json config file in the sub directory
    let file = path.join(dir, 'config.json')
    return writeFile(JSON.stringify(jsonData, null, 2), file)
}


//JSON CRUD Operations

// helper methods
function readFile(filePath, returnJson = false, encoding = 'utf8') {
    return new Promise((resolve, reject)=>{
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                // throw err;
                reject(err)
            }
    
            resolve(returnJson ? JSON.parse(data) : data);
        });
    })
};

function writeFile(fileData, filePath, encoding = 'utf8') {
    return new Promise((resolve, reject)=>{
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                // throw err;
                reject(err)
            }

            resolve()
        });
    })
};
