const mongoose = require('mongoose');


let schema = new mongoose.Schema({
        title:{
            type:String,
        },
        description:{
            type : String,
        },
        date:{
            type:String,
            default:Date.now
        },
        author:{
            type:String
        }
});

let articles = mongoose.model("article",schema);

module.exports = articles;