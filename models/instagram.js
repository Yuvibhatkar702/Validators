const mongoose = require("mongoose");
const connect = require("../config/connect");
const joi = require("joi");

const post = mongoose.Schema({
        Containe: String,
        date : {
            type: Date,
            default: Date.now()
        }
})


const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email : {
        type: String,
        require: true
    },
    password : {
        type: String,
        require: true
    },
    post: [post]
    
})

function schemaVallidation(data){
    const validation = joi.object({
        username: joi.string().min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(30).required()
    })

    let {error} = validation.validate(data);
    return error;
}

const userSchemaInsta = mongoose.model("userSchemaInsta", userSchema);

module.exports = {userSchemaInsta,schemaVallidation}; 

 