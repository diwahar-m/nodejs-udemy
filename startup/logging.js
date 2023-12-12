// startup/logging.js
const winston = require('winston');
// require('winston-mongodb'); // commenting it because 
require('express-async-errors');  // adds try catch block to all async functions

module.exports = function(){
    // process.on('uncaughtException', (ex) => {
    //     winston.error(ex.message, ex); 
    //     process.exit(1);
    // }) 

    //use below code instead of above method
    winston.exceptions.handle( 
        new winston.transports.File({ filename: 'uncaughtExceptions.log'}),
        new winston.transports.Console({colorize: true, prettyPrint: true}) // displays on the terminal
    ) 

    process.on('unhandledRejection', (ex) => {
        // winston.error(ex.message, ex);
        // process.exit(1); 
        throw(ex); // now above mentioned method will catch this error and log in the file
    }) 

    winston.add(new winston.transports.File({filename: 'logfile.log'}));
    // winston.add(winston.transports.MongoDB, 
    //     {db: 'mongodb://localhost/vidly'}, 
    //     {level:'error'} // optional, only error msg will be logged in the db
    // )
} 


