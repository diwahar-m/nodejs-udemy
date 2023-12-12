//startup/validation.js
const Joi = require('joi'); 

module.exports = function(){
    Joi.objectId = require('joi-objectid')(Joi); 
    // 'joi-objectid' returns a function. 
    // we are passing Joi as an argument  
    // From these, we are getting objectid method from the function 
}