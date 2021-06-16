fileController = {}
module.exports = fileController;

const fsConnect = require('../src/fs-connect')
const commonController = require('./common-controller')

fileController.uploadImages = function (projectId, file, fileName) {
    return commonController.getDetailsFromProjectId(projectId).then(({ username, projectname }) => {
        return fsConnect.uploadImage(username, projectname, file, fileName)
    })
}

fileController.getImages = function (projectId) {
    return commonController.getDetailsFromProjectId(projectId).then(({username, projectname})=>{
        return fsConnect.getImages(username, projectname)
    })
}