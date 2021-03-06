const express = require('express');
const helmet = require("helmet");
const connectDB = require('./config/db');
const path = require('path');
const rateLimit = require("express-rate-limit");
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const fileupload = require("express-fileupload");
const fileRoute = require('./routes/api/file');
var multer = require('multer')
// const nodemailer = require("nodemailer");
const cors = require('cors');

// loading the config using the dotenv module

const router = express.Router();

const app = express();

 // We export the router so that the server.js file can pick it up
 module.exports = router;

// Get instance by resolving ClamScan promise object, issue with getting correct socket for MAC OSX Big Sur configured, could get it working on Ubuntu no promblem.
//const NodeClam = require('clamscan');

//const ClamScan = new NodeClam().init({
  //debug_mode: true,
  //scan_recursively: false,
  //clamdscan: {
  //    socket: '/usr/local/var/run/clamav/clamd.sock',
  //    timeout: 120000,
  //    local_fallback: true,
  //    path: 'usr/local/etc/clamav',
  //    config_file: '/usr/local/etc/clamav/freashclam.conf'
 // },/
//});


 app.use(cors())

 app.use(fileRoute);



 
 

// Data Sanitization against NoSQL Injection Attacks
app.use(mongoSanitize());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());



// Data Sanitization against XSS
app.use(xss());


// add rate-limiting to protect api end-point from being DDoS

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

// only apply to requests that begin with /api/
app.use("/api/", apiLimiter);

// adding helmet to secure Express http headers
app.use(helmet ());

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
