const mongoose = require('mongoose'); 
const express = require('express'); 
const router = express.Router(); 
const {User, validate} = require('../models/user'); 
const _ = require('lodash');  
const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken'); 
const config = require('config'); 
const auth = require('../middleware/auth')
// routes/users.js
// for security reason, we will not send id through path
router.get('/me', auth, async (req,res) =>{
    // getting id returning user details.
    const user = await User.findById(req.user._id).select('-password'); 
    res.send(user);

})

router.post('/', async (req,res) =>{ 
    const {error} = validate(req.body) 
    if(error) return res.status(400).send(error.details[0].message); 

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already registered!'); 

    user = new User(_.pick(req.body, ['name','email','password'])); 
    const salt = await bcrypt.genSalt(10); // generated salt rounds
    user.password = await bcrypt.hash( user.password, salt ); // hashed password  
    await user.save(); 
   
    const token = user.generateAuthToken();
    // sending token within the response header 
    // res.send(key, vlaue)
    res.header('x-auth-token',token).send(_.pick(user, ['_id','name','email'])); 

   
}) 

module.exports = router ;