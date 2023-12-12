// middleware/validate.js
module.exports = (validator) =>{
    return (req, res, next) =>{
        const {error} = validateReturn(req.body) ;
        if(error) return res.status(400).send('movieId not provided')
        next();
    }  
}