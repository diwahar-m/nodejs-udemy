// startup/prod.js
const helmet = require('helmet'); 
const compression = require('compression');
// function should take our app object.
module.exports = function(app) {
    app.use(helmet());
    app.use(compression());
}