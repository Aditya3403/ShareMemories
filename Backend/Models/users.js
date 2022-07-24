const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    username:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    continent:{
        type:String,
    },
    password:{
        type:Number,
    },
    bio:{
        type:String,

    },
    profileImage:{
        data:Buffer,
        contentType:String
    },
    tokens:[
        {
            token:{
            type: String,
            required:true

        }
    }
    ]
});

userSchema.methods.generateAuthToken = async function (){
    try {
        let token = jwt.sign({_id:this.id} , "MYNAMEISADITYABANSALIAMFROMCHANDIGARH");
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

const ProjectUser = mongoose.model("ProjectUser", userSchema);

module.exports = ProjectUser;