//middleware/validateObjectId.js 
const monoose = require('mongoose'); 

module.exports = function(req, res, next){
    // checking whether ID is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) 
        return res.status(404).send('Invalid ID.'); 
}