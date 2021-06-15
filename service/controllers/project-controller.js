projectController = {}
module.exports = projectController;

const dbConnect = require('../src/db-connect')
const fsConnect = require('../src/fs-connect')
var ObjectId = require('mongodb').ObjectId; 

projectController.setUpNewProject = function(data){
    let newproject = {
        name: data.name,
        type: data.type,
        created: new Date(),
        updated: new Date(),
        author: data.user._id,
        config: data.config
    }

    let email = data.user.email;

    let promise1 = fsConnect.createNewConfig(newproject.name, email)
    let promise2 = dbConnect.addNewProject(newproject)

    // TODO: Add checks to see if folder or DB already has this project
    return Promise.all([promise1, promise2]).then((responses)=>{
        return {success: true, message: 'New Project added to DB', data: responses[1]}
    }).catch((error)=>{
        reject({success: false, message: 'Error Occured.', error: JSON.stringify(error)})
    })
}

projectController.deleteExistingProject = function(projectId){
    console.log('deleting project with id', projectId)
    let o_id = new ObjectId(projectId)
    return dbConnect.findOneProject({_id: o_id}).then((project)=>{
        console.log('deleting project', project)
        if(project){
            return dbConnect.findOneUser({_id: project.author}).then((user)=>{
                let promise1 = fsConnect.deleteSubDirectory(project.name, user.email)
                let promise2 = dbConnect.removeExistingProject(projectId)
                return Promise.all([promise1, promise2]).then(responses => {
                   return { success: true, message: 'Project Deleted Successfully',  response: responses[1] }
                }).catch((err) => {
                    return Promise.reject({ success: false, message: 'Error occured while deleting the project.',  response: JSON.stringify(err) })
                })
            })
        }else{
            return Promise.reject({ success: false, message: 'Project does not exist' })
        }
    }).catch((err)=>{
        console.log('deleting project error', err)
        return Promise.reject({ success: false, message: 'Error finding project',  response: JSON.stringify(err) })
    })
}

projectController.getProjectConfiguration = function(projectId){
    let o_id = new ObjectId(projectId)
    return dbConnect.findOneProject({_id: o_id}).then((project)=>{
        if(project){
            return dbConnect.findOneUser({_id: project.author}).then((user)=>{
                let promise1 = fsConnect.getConfig( user.email, project.name)
                return Promise.all([promise1]).then(responses => {
                   return { success: true,  response: responses[0] }
                }).catch((err) => {
                    return Promise.reject({ success: false, message: 'Error occured while fetching the project config.',  response: JSON.stringify(err) })
                })
            })
        }else{
            return Promise.reject({ success: false, message: 'Project does not exist' })
        }
    }).catch((err)=>{
        console.log('deleting project error', err)
        return Promise.reject({ success: false, message: 'Error finding project',  response: JSON.stringify(err) })
    })
}

projectController.setProjectConfiguration = function(projectId, data){
    let o_id = new ObjectId(projectId)
    return dbConnect.findOneProject({_id: o_id}).then((project)=>{
        if(project){
            return dbConnect.findOneUser({_id: project.author}).then((user)=>{
                let promise1 = fsConnect.setConfig(user.email, project.name, data)
                return Promise.all([promise1]).then(responses => {
                   return { success: true, message: "JSON updated successfully",  response: responses[0] }
                }).catch((err) => {
                    return Promise.reject({ success: false, message: 'Error occured while updating the project config.',  response: JSON.stringify(err) })
                })
            })
        }else{
            return Promise.reject({ success: false, message: 'Project does not exist' })
        }
    }).catch((err)=>{
        console.log('deleting project error', err)
        return Promise.reject({ success: false, message: 'Error finding project',  response: JSON.stringify(err) })
    })
}