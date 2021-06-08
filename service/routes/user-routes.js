const users = require('express').Router();
module.exports = users;

const dbConnect = require('../src/db-connect')


//C
users.post('/add', (req, res)=>{
    let data = req.body
    console.log(data)
    let newuser = {
        name: data.name,
        email: data.email,
        password: data.password
    }
    dbConnect.addNewUser(newuser).then(()=>{
        res.status(200).json({message: 'New User added to DB'});
    }).catch((err)=>{
        res.json({message: 'Error Occured.', error: JSON.stringify(err)})
    })
})


// R
users.get('/', (req, res)=>{
    dbConnect.findManyUser().then((users)=>{
        res.status(200).json(users);
    })
})

users.get('/:userId', (req, res)=>{
    let userId = req.params.userId
    dbConnect.findOneUser({_id: userId}).then((user)=>{
        res.status(200).json(user);
    })
})


// U
users.put('/update/:userId', (req, res)=>{
    const id = req.params.userId
    const data = req.body.data;
    dbConnect.updateUser(id, data).then(post => {
        res.send({ success: true, message: "User updated Successfully", response: post })
    }).catch((err) => {
        res.send({ success: false, message: "Error occurred while updating the user", response: err })
    })
})


// D
users.delete('/delete/:userId', (req, res)=>{
    const id = req.params.userId
    dbConnect.findOneUser({_id: id}).then((user)=>{
        console.log(user)
        if(user){
            dbConnect.removeExistingUser(id).then(deletedUser => {
                res.send({ success: true, message: 'User Deleted Successfully',  response: deletedUser })
            }).catch((err) => {
                res.send({ success: false, message: 'Error occured while deleting the user.',  response: JSON.stringify(err) })
            })
        }else{
            res.send({ success: false, message: 'User does not exist' })
        }
    }).catch((err)=>{
        res.send({ success: false, message: 'Error finding user',  response: JSON.stringify(err) })
    })
})

