const jwt = require("jsonwebtoken");
const { model } = require("mongoose");
const ProjectUser = require("../Models/users.js");

const Authenticate = async (req,res,next) => {
    try {
        const token = await req.cookies.token;
        const verifyToken = jwt.verify(token,"MYNAMEISADITYABANSALIAMFROMCHANDIGARH");
        const rootUser = await ProjectUser.findOne({_id:verifyToken._id,"tokens.token":token});
        if (!rootUser) {
            console.log("User not found");
        } 
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();
        
    } catch (error) {
        console.log(error);
    }

}

module.exports = Authenticate;