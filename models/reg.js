const express = require("express");
const mongoose = require("mongoose");
const connect = require("../config/connect");
const postModel = require("./post");

const reg = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    post:[
       {
         type: mongoose.Schema.Types.ObjectId,
         ref : "postModel"
       }
    ]
})

const regSchema = mongoose.model("regSchema", reg);

module.exports = regSchema;

