const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const ImageBE = require('./models/imageBE');


const app = express();


// Config
const config = require('./config');

const imageRouter = require('./routes/router');
const userRouter = require('./routes/user_routes');

// ------------------------------------------
// MongoDB
// ------------------------------------------

mongoose.connect(config.MONGO_URI);
const mongoDb = mongoose.connection;

mongoDb.on('error', function() {
  console.error(`MongoDB connection failed. Ensure ${config.MONGO_URI} is running.`);
});

mongoDb.once('open', function callback() {
  console.info(`Connected to MongoDB: ${config.MONGO_URI}`);
});



// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Allow CORS - setting and access headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

// Point static path to dist
// app.use(express.static(path.join(__dirname, 'dist')));



app.use("/api/images", imageRouter);
app.use("/api/user", userRouter);


  module.exports = app;
