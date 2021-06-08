const projects = require('express').Router();
module.exports = projects;

const dbConnect = require('../src/db-connect')

// C
projects.post('/add', (req, res)=>{
    let data = req.body
    let newproject = {
        name: data.name,
        type: data.type,
        created: new Date(),
        updated: new Date(),
        author: data.user._id,
        config: data.config
    }
    dbConnect.addNewProject(newproject).then((project)=>{
        res.status(200).json({success: true, message: 'New Project added to DB', data: project});
    }).catch((error)=>{
        res.json({success: false, message: 'Error Occured.', error: JSON.stringify(error)})
    })
})

// R
projects.get('/', (req, res)=>{
    dbConnect.findManyProject().then((projects)=>{
        res.status(200).json(users);
    })
})

projects.get('/:projectId', (req, res)=>{
    let projectId = req.params.projectId
    dbConnect.findOneProject({_id: projectId}).then((project)=>{
        res.status(200).json(project);
    })
})

projects.get('/getProjectsByAuthor/:userId', (req, res)=>{
    let userId = req.params.userId;
    dbConnect.findManyProject({author: userId}).then((projects)=>{
        res.status(200).json({success: true, message: '', data: projects});
    }).catch((error)=>{
        res.json({success: false, message: 'Error Occured.', error: JSON.stringify(error)})
    })
})

// U
projects.put('/update/:projectId', (req, res)=>{
    const id = req.params.projectId
    const data = req.body.data;
    dbConnect.updateProject(id, data).then(project => {
        res.send({ success: true, message: "User updated Successfully", response: project })
    }).catch((err) => {
        res.send({ success: false, message: "Error occurred while updating the user", response: err })
    })
    
})

// D
projects.delete('/delete/:projectId', (req, res)=>{
    const id = req.params.projectId
    console.log(id)
    dbConnect.findOneProject({_id: id}).then((project)=>{
        if(project){
            dbConnect.removeExistingProject(id).then(deletedProject => {
                res.send({ success: true, message: 'Project Deleted Successfully',  response: deletedProject })
            }).catch((err) => {
                res.send({ success: false, message: 'Error occured while deleting the project.',  response: JSON.stringify(err) })
            })
        }else{
            res.send({ success: false, message: 'Project does not exist' })
        }
    }).catch((err)=>{
        res.send({ success: false, message: 'Error finding project',  response: JSON.stringify(err) })
    })
})
