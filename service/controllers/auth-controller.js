authController = {}
module.exports = authController;

const dbConnect = require('../src/db-connect')
const jwt = require('jsonwebtoken');
const uuid = require('node-uuid');
const SECRET_KEY = 'Wow.MoreOfAPassphraseThanAnActualPassword';

authController.checkLogin = function(username, password){
    return new Promise((resolve, reject)=>{
        dbConnect.findOneUser({name: username, password: password}).then((user)=>{
            if(user){
                const userID = user._id // findUserIdForEmail(usernmae)   fetch unique ID for that user from mongo; Random for now

                let options = {
                    expiresIn: '2h',
                    jwtid: uuid.v4()
                };

                let token = jwt.sign({
                    user: userID
                }, SECRET_KEY, options);

                LoginResult = {
                    JWT: token,
                    user: user
                }

                resolve(LoginResult)
            }else{
                reject({success: false, message: 'Invalid username or password. No such user exists.', response: user})
            }
        }).catch((error)=>{
            reject({success: false, message: 'Error while checking the DB', response: error})
        })
    })
}

function ValidateAccess(token) {
    return new Promise((resolve, reject) => {
        try {
            let decoded = jwt.verify(token, SECRET_KEY, { algorithms: ["HS256"] })
            resolve(decoded);
        } catch (err) {
            reject(err);
        }
    });
}

function withAuthentication(req, res, next) {
    console.log('withAuthentication')
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization;
        console.debug("[Access] Found a token");
    } else {
        console.debug("[Access] No Authorization header found");
        return res.status(401).send("No Authorization header found");
    }
    return ValidateAccess(token)
        .then((user) => {
            userData = user;
            console.info('[Access] Authorized user:', user)
            req.auth = user;
            next();
        })
        .catch((errNoAccess) => {
            console.info('[Access] Rejected user with error:', errNoAccess)
            res.status(401).send(errNoAccess);
        });
}