const projects = require('express').Router();
module.exports = projects;

const dbConnect = require('../src/db-connect')
const fsConnect = require('../src/fs-connect')
const path = require("path")

const authController = require('../controllers/auth-controller')
const projectController = require('../controllers/project-controller')
const fileController = require('../controllers/file-controller')

// C
projects.post('/add', authController.withAuthentication, (req, res) => {
    let data = req.body

    projectController.setUpNewProject(data).then((response) => {
        res.status(200).json(response);
    }).catch((error) => {
        res.json(error)
    })
})

// R
//Not used at the moment
projects.get('/', (req, res) => {
    dbConnect.findManyProject().then((projects) => {
        res.status(200).json(users);
    })
})

//Not used at the moment
projects.get('/:projectId', (req, res) => {
    let projectId = req.params.projectId
    dbConnect.findOneProject({ _id: projectId }).then((project) => {
        res.status(200).json(project);
    })
})

projects.get('/getProjectsByAuthor/:userId', (req, res) => {
    let userId = req.params.userId;
    dbConnect.findManyProject({ author: userId }).then((projects) => {
        res.status(200).json({ success: true, message: '', data: projects });
    }).catch((error) => {
        res.json({ success: false, message: 'Error Occured.', error: JSON.stringify(error) })
    })
})

// U
//Not used at the moment
projects.put('/update/:projectId', (req, res) => {
    const id = req.params.projectId
    const data = req.body.data;
    dbConnect.updateProject(id, data).then(project => {
        res.send({ success: true, message: "User updated Successfully", response: project })
    }).catch((err) => {
        res.send({ success: false, message: "Error occurred while updating the user", response: err })
    })

})

// D
projects.delete('/delete/:projectId', (req, res) => {
    const id = req.params.projectId
    projectController.deleteExistingProject(id).then((response) => {
        res.status(200).json(response);
    }).catch((error) => {
        res.json(error)
    })
})


//JSON Operations
// READ
projects.get('/getProjectConfig/:projectId', (req, res) => {
    const id = req.params.projectId;
    projectController.getProjectConfiguration(id).then((response) => {
        res.status(200).json(response);
    }).catch((error) => {
        res.json(error)
    })
});
//WRITE
projects.post('/setProjectConfig/:projectId', (req, res) => {
    const id = req.params.projectId;
    const data = req.body.data
    projectController.setProjectConfiguration(id, data).then((response) => {
        res.status(200).json(response);
    }).catch((error) => {
        res.json(error)
    })
});



// This method stores file in nodejs folder
projects.post('/uploadImages', function (req, res) {
    let projectId = req.headers.projectId || req.headers.projectid;
    req.pipe(req.busboy);
    // This will run for each file
    let fileCount = 0
    req.busboy.on('file', function (fieldname, file, filename) {
        fileCount++
        fileController.uploadImages(projectId, file, filename).then((response) => {
            fileCount--
            if(fileCount == 0){
                console.log('about to send response', response)
                res.status(200).json({
                    success: true,
                    message: "Image uploaded successfully",
                    response: response
                });
            }

        }).catch((err) => {
            console.log(err)
            res.status(500).json({
                success: false,
                message: "Image upload failed",
                errors: err
            });
        })
    });
});

// This method deletes file from nodejs folder
projects.post('/deleteImage', (req, res) => {
    let path = req.body.path
    fsConnect.deleteImage(path).then(()=>{
        res.send({
            success: true,
            message: "File deleted successfully"
        })
    }).catch((err)=>{
        res.send({
            success: false,
            message: "Unable to delete file",
            error: err
        })
    })
});

//This method will get all images from nodejs folder
projects.get('/getAllImages/:projectId', (req, res) => {
    const id = req.params.projectId;
    fileController.getImages(id).then((response)=>{
        res.send({success: true, data: response})
    }).catch((error)=>{
        res.send({success: false, data: error})
    })
   
})