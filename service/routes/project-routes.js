const projects = require('express').Router();
module.exports = projects;

const dbConnect = require('../src/db-connect')
const fsConnect = require('../src/fs-connect')

const authController = require('../controllers/auth-controller')
const projectController = require('../controllers/project-controller')

// C
projects.post('/add', authController.withAuthentication, (req, res)=>{
    let data = req.body

    projectController.setUpNewProject(data).then((response)=>{
        res.status(200).json(response);
    }).catch((error)=>{
        res.json(error)
    })
})

// R
//Not used at the moment
projects.get('/', (req, res)=>{
    dbConnect.findManyProject().then((projects)=>{
        res.status(200).json(users);
    })
})

//Not used at the moment
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
//Not used at the moment
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
    projectController.deleteExistingProject(id).then((response)=>{
        res.status(200).json(response);
    }).catch((error)=>{
        res.json(error)
    })
})


//JSON Operations
// READ
projects.get('/getProjectConfig/:projectId', (req, res) => {
    const id = req.params.projectId;
    projectController.getProjectConfiguration(id).then((response)=>{
        res.status(200).json(response);
    }).catch((error)=>{
        res.json(error)
    })
});
//WRITE
projects.post('/setProjectConfig/:projectId', (req, res) => {
    const id = req.params.projectId;
    const data = req.body.data
    projectController.setProjectConfiguration(id, data).then((response)=>{
        res.status(200).json(response);
    }).catch((error)=>{
        res.json(error)
    })
});

