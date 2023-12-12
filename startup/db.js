// startup/db.js
const winston = require('winston')
const mongoose = require('mongoose');  
const config = require('config')

module.exports = function(){ 
    const db = config.get('db') ;
    console.log(db);
    mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}...`))
   // we removed catch here because we want process to be terminated if error
   // global error handler will deal with the rejected promise
}