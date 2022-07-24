const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const path = require("path");
const multer = require("multer");
const passport = require("passport");
const session = require("express-session");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const ProjectUser = require("./Models/users.js");
const UserPost = require("./Models/post.js");
const UserLikes = require("./Models/likes.js");
const UserComment = require("./Models/comments.js");
const authenticate = require("./Middleware/auth");
const cookieParser = require("cookie-parser");
require("./db/connection");
require("./router/authentication");
const { profile, error } = require("console");

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, 'public')))


const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req,file,cb)=>{
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname));

    }
});

const upload = multer({
    storage:storage
});

const Upload = multer({
    storage:storage
});


app.get("/home",authenticate,async(req,res)=>{
    try {
        const userData = await UserPost.find({'user_id': {$ne : req.rootUser._id}}).sort({_id:-1});
        res.send(userData);
    
    } catch (error) {
        console.log(error);
    }
   
})
app.post("/comments",authenticate,async(req,res)=>{
    try {
        const username = req.body.username;
        const userComments = new UserComment({
            username:req.body.username,
            commenteduser_id:req.rootUser._id,
            commenteduser_username:req.rootUser.username,
            comment:req.body.comment
        });
        await userComments.save();
    
    } catch (error) {
        console.log(error);
    }
   
})
app.get("/comments",authenticate,async(req,res)=>{
    try {
        const commentedusers = await UserComment.find({});
        res.send(commentedusers)
    
    } catch (error) {
        console.log(error);
    }
   
})
app.post("/likes",authenticate,async(req,res)=>{
    try {
        const userLikes = new UserLikes({
            username:req.body.username,
            user_id:req.body.user_id,
            likedusers_id:req.rootUser._id
        });
        await userLikes.save()
    
    } catch (error) {
        console.log(error);
    }
   
})
app.post("/signup",async(req,res)=>{
    try {
        const userData = new ProjectUser(req.body);
        await userData.save();
        res.redirect("/login");
    
    } catch (error) {
        console.log(error);
    }
   
})
app.get("/logout",authenticate,async(req,res)=>{
    try {
        res.clearCookie("token", { path:'/login' });
        res.redirect("/login");
    
    } catch (error) {
        console.log(error);
    }
   
})

app.post("/login",async(req,res)=>{
    let token;
    const email = req.body.email;
    const password = req.body.password;
    const userCred = await ProjectUser.findOne({email:email});
    if (userCred != null) {
        if (userCred.email == email && userCred.password==password) {
            
            token = await userCred.generateAuthToken();
            // console.log(token);
            res.cookie("token",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true

            });
            res.redirect("/dashboard")
        
        }else{
            res.send("Invalid Credentials. Pls try again later.");

        }
        
    } else {
        res.send("User not found.");
    }
   
})
app.get("/dashboard",authenticate , async(req,res)=>{
    // console.log(req.rootUser);
    res.send(req.rootUser);
    
})
app.get("/posts",authenticate , async(req,res)=>{
    // console.log(req.rootUser);
    res.send(req.rootUser);
    
})
app.post("/posts",upload.single("userPosts"),authenticate , async(req,res,next)=>{
    try {
        // console.log(req.file.filename);
        const postData = new UserPost ({
            name:req.rootUser.name,
            postDescription:req.body.postDescription,
            user_id:req.rootUser._id,
            username:req.rootUser.username,
            postImages:req.file.filename
        });
        await postData.save();

    
    } catch (error) {
        console.log(error);
    }
    
})
app.get("/user-post",authenticate, async(req,res)=>{
    try {
        const userPosts = await UserPost.count({_id : req.rootUser._id});
        res.send(userPosts);
        
    } catch (error) {
        console.log(error);
        
    }
})
app.get("/edit-profile",authenticate , async(req,res)=>{
    // console.log(req.rootUser);
    res.send(req.rootUser);
    
})
app.post("/edit-profile",authenticate , async(req,res)=>{
    try {
        console.log(req.body.bio);
        const _id = req.rootUser._id;
        const userBio = await ProjectUser.updateOne({_id:_id},{
            $set : {
                bio: req.body.bio,
                email:req.body.email,
                username:req.body.username
            }
        });
        res.redirect("/edit-profile");
        
    } catch (error) {
        console.log(error);
    }
    
})

app.post("/upload-image",Upload.single("userProfileImage"),authenticate,async(req,res,next)=>{
    
    console.log(req.file);
    try {
        const _id = req.rootUser._id;
        // console.log( _id);
        await ProjectUser.updateOne({_id: _id },{profileImage: req.file.filename,});
        res.redirect("/dashboard");

    
    } catch (error) {
        console.log(error);
    }
    
});

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla bla' 
  }));
app.use(passport.initialize());
app.use(passport.session());
app.get("/google",passport.authenticate("google",{scope:["profile","email"]}));
app.get("/auth/google/callback",passport.authenticate("google"),(req,res)=>{
   console.log(req.user);
   res.redirect("/");
});
app.get("/auth/facebook",passport.authenticate("facebook"),);
app.get("/auth/facebook/callback",passport.authenticate("facebook"),(req,res)=>{
   res.redirect("/");
});
app.get("/auth/twitter",passport.authenticate("twitter"));
app.get("/auth/twitter/callback",passport.authenticate("twitter"),(req,res)=>{
   res.redirect("/");
});
app.get("/github",passport.authenticate("github",{scope:["profile","email"]}));
app.get("/auth/github/callback",passport.authenticate("github"),(req,res)=>{
   res.redirect("/");
});


app.listen(5000,()=>{
    console.log("listening....");
})