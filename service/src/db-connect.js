var dbConnect = {};
module.exports = dbConnect;

const mongoose = require("mongoose");
const MongoDBURL = process.env.MONGO_URL || "mongodb://localhost:27017/ism-auth";;
var USER = require("../models/UserModel");
var PROJECT = require("../models/ProjectModel");


dbConnect.connect = function() {
  //Mongoose connection
  return mongoose.connect(MongoDBURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  });
};


// PROJECTS
//C
dbConnect.addNewProject = (obj) => new PROJECT(obj).save();
//R
dbConnect.findOneProject = (obj) => PROJECT.findOne(obj);
dbConnect.findManyProject = (obj) => PROJECT.find(obj);
//U
dbConnect.updateProject = (ID, obj) => PROJECT.findByIdAndUpdate(ID, obj);
//D
dbConnect.removeExistingProject = (ID) => PROJECT.findByIdAndDelete(ID);



// USERS
//C
dbConnect.addNewUser = (obj) => new USER(obj).save();
//R
dbConnect.findOneUser = (obj) => USER.findOne(obj);
dbConnect.findManyUser = (obj) => USER.find(obj);
//U
dbConnect.updateUser = (ID, obj) => USER.findByIdAndUpdate(ID, obj);
//D
dbConnect.removeExistingUser = (ID) => USER.findByIdAndDelete(ID);
