var fsConnect = {};
module.exports = fsConnect;

const uploadFolder = 'uploads/';
fsConnect.uploadFolder = uploadFolder;

const fs = require('fs');
const path = require("path")
const commonController = require('../controllers/common-controller')

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
        fs.mkdirSync(dir, { recursive: true });
    }
}

// TODO: Make promise
fsConnect.deleteDirectory = function (dirName) {
    let dir = path.join(uploadFolder, dirName)

    if (fs.existsSync(dir)) {
        fs.rmdirSync(dir, { recursive: true })
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

fsConnect.createNewConfig = function (name, dirName) {
    let dir = path.join(uploadFolder, dirName, name);
    // Create a Sub Directory if it does not exists
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Create a empty json config file in the sub directory
    file = path.join(dir, 'config.json')
    return writeFile(JSON.stringify({}), file)
}


fsConnect.getConfig = function (username, projectname) {
    let dir = path.join(uploadFolder, username, projectname);

    // Create a empty json config file in the sub directory
    let file = path.join(dir, 'config.json')
    return readFile(file, true)
}

fsConnect.setConfig = function (username, projectname, jsonData) {
    let dir = path.join(uploadFolder, username, projectname);

    // Create a empty json config file in the sub directory
    let file = path.join(dir, 'config.json')
    return writeFile(JSON.stringify(jsonData, null, 2), file)
}

fsConnect.uploadImage = function (username, projectname, file, fileName) {
    let dir = path.join(uploadFolder, username, projectname, 'images');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Create a empty json config file in the sub directory
    let extention = fileName.split('.')[fileName.split('.').length - 1]
    updatedName = 'logo.'+extention
    let filePath = path.join(dir, updatedName)
    return writeFileStream(file, filePath)
}

fsConnect.getImages = function(username, projectname){
    return new Promise((resolve, reject)=>{
        let imageUploadFolder = path.join(uploadFolder, username, projectname, 'images');
    
        fs.readdir(imageUploadFolder, (err, files) => {
            if(files && files.length){
                let all = files.map((file) => {
                    return imageUploadFolder + '/' + file;
                })
                resolve(all)
            }else{
                resolve(null)
            }
        });
    })
}

fsConnect.deleteImage = function(filePath){
    return new Promise((resolve, reject)=>{
        console.log(filePath)
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(err)
            }
            
            resolve()
        })
    })
}


//JSON CRUD Operations

// helper methods
function readFile(filePath, returnJson = false, encoding = 'utf8') {
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                // throw err;
                console.log('writeFile error', err)
                reject(err)
            }

            resolve()
        });
    })
};

function writeFileStream(fileData, filePath, encoding = 'utf8') {
    return new Promise((resolve, reject) => {
        let writeStream = fs.createWriteStream(filePath);
        fileData.pipe(writeStream)
        // the finish event is emitted when all data has been flushed from the stream
        writeStream.on('close', () => {
            console.log('wrote all data to file');
            resolve()
        });
    })
}
