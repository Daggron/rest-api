const router = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const articles = require('../models/articles');
const verify = require('./verify');

router.get('/',(req,res)=>{
    res.send("Hello I am working fine");
});

router.post('/',async (req,res)=>{

    req.check('email','Please enter a valid email').isEmail();
    req.check('password','Password does not match').equals(req.body.confirmPassword);
    req.check('password','Password length should be greater than 8 characters').isLength({min:7});

    let errors = await req.validationErrors();

    if(errors){
        let arr = errors.map(error=>{
            return error.msg;
        });

        return res.status(400).send(arr);
    }

    let emailFound = await User.findOne({email:req.body.email});

    if(emailFound){
        return res.status(400).send("Email Already Exits");
    }



    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(req.body.password,salt);
    user.password = hash;

    User.create(user,(err)=>{
        if (err) throw err;
        res.send("User created Successfully");
    })


});

router.post('/login',async (req,res)=>{
    let found = await User.findOne({email:req.body.email});
    if(!found){
        return res.status(400).send("Email Doesn't exists");
    }

    let pass = await bcrypt.compare(req.body.password,found.password);
    if(!pass){
        res.status(400).send("Email Or password is incorrect");
    }

    let token = jwt.sign({_id:found._id},process.env.TOKEN_SECRET);

    // req.session.user = found;

    console.log("setting"+token);
    res.send("Horrah You are logged in now"+token);
});

router.post('/post',verify.verify,(req,res)=>{

  

    let article = new articles();

    article.title = req.body.title;
    article.description = req.body.description;
    article.author = req.body.author;

     req.session.user = req.user;
    articles.create(article)
    .then(()=>{
        console.log(req.session.user);
    })
    .then(res.send("Article saved"));



});



router.get("/data",(req,res)=>{
     res.send(req.session.user);
});

module.exports = router;