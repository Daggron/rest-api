const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    name : {
        required : true,
        type : String,
        max : 1024
    },
    email :{
        type: String,
        required : true,
        min: 7 ,
        max : 2024,
        unique : true
    },
    password: {
        type:String,
        required:true,
        min: 8,
        max : 16
    }
});

let User = mongoose.model("User",schema);

module.exports  = User;
