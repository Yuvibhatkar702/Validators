const connect = require('../config/connect');    
const mongoose = require('mongoose');
const joi = require('joi'); // for validation

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        maxlength: 10
    },
    password: {
        type: String,
        required: true
    }
})

function addValidation(data){
    const userval = joi.object({
        name: joi.string().required(),
        email: joi.string().required().email(),
        age: joi.number().required(),
        mobile: joi.number().required(),
        password: joi.string().required()
    })

    let {error} = userval.validate(data);
    return error;
}

const user = mongoose.model('user', userSchema);

module.exports = {user, addValidation};