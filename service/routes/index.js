const routes = require('express').Router();
const users = require('./user-routes');
const project = require('./project-routes');
const authController = require('../controllers/auth-controller')

routes.use('/users', users);
routes.use('/projects', project);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

routes.post('/login', (req, res) => {
  const username = req.body.username,
      password = req.body.password;

  // TODO: Check username and password in MongoDB
  authController.checkLogin(username, password).then((LoginResult)=>{
      // res.cookie("SESSIONID", token, {httpOnly:true, secure:true});
      res.send({ success: true, LoginResult })

      // const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
      //     algorithm: 'RS256',
      //     expiresIn: 120,
      //     subject: userID
      // })

      //Option 1: Send it back in cookie
      //Advantage: client request automatically attaches cookie, hence no coding on front end
      // set it in an HTTP Only + Secure Cookie
      // res.cookie("SESSIONID", jwtBearerToken, {httpOnly:true, secure:true});


      //Option 2: set it in the HTTP Response body
      //Disadvantage: Client calls will not have the token automatically. will require coding on front end to attach the token with each call
      // res.status(200).json({
      //     idToken: jwtBearerToken, 
      //     expiresIn: 120
      // });
  }).catch((error)=>{
    res.send(error)
  })
})


module.exports = routes;