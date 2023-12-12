// index.js 
const express = require('express');
const app = express();   
const winston = require('winston');

require('./startup/logging')(); // load this 1st so it handle all the errors
require('./startup/routes')(app);
require('./startup/db')(); 
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

const port = process.env.PORT || 3000; 
// index.js 
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`)); 
module.exports = server ; 

// using () immediately after require() is specific to cases where the module 
// needs to be invoked for initialization purposes