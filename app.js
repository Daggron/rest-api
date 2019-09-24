const express = require('express');
const app = express();
const expressSession = require('express-session');
const expressValidator = require('express-validator');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true});

let db = mongoose.connection;

db.on('error',(err)=>{
    console.log(err);
});

db.once('open',()=>{
    console.log('Database connected successfully');
    
});



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use(expressSession({
    secret : ' A keyboard , cat ,dog , Thanos killed spiderman in infinity war',
    saveUninitialized : false,
    resave : true
}));

app.use(expressValidator());

app.get('/',(req,res)=>{
    res.send("Hello Abhay Sharma");
})


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('Server Up and running on port 3000');
})