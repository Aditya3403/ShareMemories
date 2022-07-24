const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const postsSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    username:{
        type:String,
    },
    postDescription:{
        type:String,
    },
    user_id:{
        type:String,
    },
    userscommented:[
        {
            _id:{
                type:String
            },
            comment:{
                type:String
            }
        }
    ],
    profileImage:{
        type : String,
    },
    postImages:[
        {
            type: String,

        }
    ]
});


const UserPost = mongoose.model("UserPost", postsSchema);

module.exports = UserPost;