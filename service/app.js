require('dotenv').config()
const PORT = process.env.PORT || 9999;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const busboy = require('connect-busboy');

const publicDir = require('path').join(__dirname,'/uploads'); 

const routes = require('./routes');
const dbConnect = require('./src/db-connect')

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(busboy());
app.use(express.static(publicDir)); 

//  Connect all our routes to our application
app.use('/', routes);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})


dbConnect.connect().then(() => {
    console.log("MongoDB Connected Successfully");
}).catch((err) => {
    console.log("MongoDB Connecttion failed:", err);
})