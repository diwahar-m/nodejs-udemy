// middleware/error.js
const winston = require('winston');

module.exports = function(err, req, res, next){
    // logging level determines the importance of msg that we going to log. 
    // It has 6 types 
    // error 
    // warn 
    // info 
    // verbose 
    // debug 
    // silly 
    winston.error(err.message, err)

    res.status(500).send('Something failed.');
}