 // middleware/async.js
 // passing a function as argument to these function
module.exports = function (handler){
    // returning a function 
    return async (req,res,next) =>{
        try{ 
            await handler(req, res)
    
        }catch(ex){
            next(ex); 
        }
    }
}