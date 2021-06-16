commonController = {}
module.exports = commonController;

const dbConnect = require('../src/db-connect')
var ObjectId = require('mongodb').ObjectId; 

commonController.getDetailsFromProjectId = function(projectId){
    let o_id = new ObjectId(projectId)
    return dbConnect.findOneProject({_id: o_id}).then((project)=>{
        if(project){
            return dbConnect.findOneUser({_id: project.author}).then((user)=>{
                return {username: user.email, projectname: project.name}
            })
        }else{
            return null
        }
    })
    
}