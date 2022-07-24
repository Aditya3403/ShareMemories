const express = require("express");
const mongoose = require("mongoose");
const profilePicSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    img:
    {
        data: Buffer,
        contentType: String
    }
})

const ProfilePic = mongoose.model("ProfilePic", profilePicSchema);

module.exports = ProfilePic;