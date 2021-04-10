const express = require('express');
const helmet = require("helmet");
const connectDB = require('./config/db');
const transporter = require('./config/config/config');
const path = require('path');
const rateLimit = require("express-rate-limit");
const dotenv = require('dotenv');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

// loading the config using the dotenv module
dotenv.config();

const app = express();

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

app.post('/send', (req, res) => {
  try {
    const mailOptions = {
      from: req.body.email, // sender address
      to: process.env.email, // list of receivers
      subject: req.body.subject, // Subject line
      html: `
      <p>You have a new contact request.</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Subject: ${req.body.subject}</li>
        <li>Message: ${req.body.message}</li>
      </ul>
      `
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.status(500).send({
          success: false,
          message: 'Something went wrong. Try again later'
        });
      } else {
        res.send({
          success: true,
          message: 'Thanks for contacting us. We will get back to you shortly'
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong. Try again later'
    });
  }
});


// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
