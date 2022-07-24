const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const likesSchema = new mongoose.Schema({

    username:{
        type:String,
    },
    user_id:{
        type:String,
    },
    likedusers_id:[
        {
            type:String
        }
    ]
   
});


const UserLikes = mongoose.model("UserLikes", likesSchema);

module.exports = UserLikes;