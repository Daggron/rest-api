const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.verify = async (req,res,next)=>{
    const token = req.header('auth-token');

    if(!token){
        return res.send("Access Denied");
    }

    const verify = jwt.verify(token,process.env.TOKEN_SECRET);

   
    


    if(!verify){
        return res.status(400).send('Invalid access');
    }
    let user = await User.findOne({_id:verify});
    // console.log(user);

    req.user = user;
    next();
}