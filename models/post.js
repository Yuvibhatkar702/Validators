
const connect = require('../config/connect');
const mongoose = require('mongoose');
const regSchema = require('./reg');

const post = mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "regSchema"
    },
    Containe: {
        type: String,
        date : Date(),
        default: Date.now()
    }
    
})

const postModel = mongoose.model("postModel", post);    

module.exports = postModel;