const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const commentsSchema = new mongoose.Schema({
   
    user_id:{
        type:String
    },
    username:{
        type:String,
    },
    commenteduser_id:{
        type:String
    },
    commenteduser_username:{
        type:String
    },
    comment:{
        type:String
    }
    
});


const UserComment = mongoose.model("UserComment", commentsSchema);

module.exports = UserComment;