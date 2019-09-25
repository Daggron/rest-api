const router = require('express').Router();
const articles = require('../models/articles');
const verify = require('./verify');



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




router.get("/data",verify.verify,async (req,res)=>{
    req.session.user = req.user;
    if(!req.session.user){
        return res.send("Invalid access");
    }
    let data = await articles.find({});

    let article_send = data.map(data=>{
        return {title:data.title,description:data.description,author:data.author}
    });

    res.status(200).send(article_send);
    
});


router.get('/data/:title',verify.verify, async (req,res)=>{
    let posts = await articles.find({title:req.params.title});
    let article_send = posts.map(data=>{
        return {title:data.title,description:data.description,author:data.author}
    });

    if(!posts){
        res.status(404).send("No posts found with the related title");
    }

    res.send(article_send);

});


router.delete('/data/:title',verify.verify,async (req,res)=>{
    let done = await articles.deleteMany({title:req.params.title});

    if(done){
        res.send("The work is done now");
    }
    else{
        res.send("can't find the post");
    }
})

module.exports = router;