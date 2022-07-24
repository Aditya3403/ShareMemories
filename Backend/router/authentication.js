const passport = require("passport");
const GoogleStratergy = require("passport-google-oauth20").Strategy;
const FacebookStratergy = require("passport-facebook").Strategy;
const TwitterStratergy = require("passport-twitter").Strategy;
const GithubStratergy = require("passport-github").Strategy;
const ProjectUser = require("../Models/users.js")

passport.use(new GoogleStratergy({
    clientID:"490815881816-fu3mtmpffb60sqbu8lua5im357tsd7d9.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:5000/auth/google/callback"
},async(accessToken,refreshToken,profile,done)=>{
    const userData = await ProjectUser.findOne({email : profile.emails[0].value});
    if (userData) {
        return done(null,userData);
        
    } else {
        const newUser= new ProjectUser({
            name:profile.displayName,
            email:profile.emails[0].value,
            password:1342345
        })
        await newUser.save();
        
        return done(null,false);
    }
    
}));
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})
passport.use(new FacebookStratergy({
    clientID:"3097011507279334",
    clientSecret:"d8e6507ffcbb1d6230fe35ef5ddd5f7a",
    callbackURL:"http://127.0.0.1:5000/auth/facebook/callback"
},(accessToken,refreshToken,profile,done)=>{
    console.log(profile);
    ProjectUser.findOne({facebookId: profile.id})
    return done(null,profile);
}));
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})
passport.use(new TwitterStratergy({
    consumerKey:"1zmtzG0ePtps7vBO1tt6uK4cU",
    consumerSecret:"NlrJMMOARzvljQqmIZ3AmDTtXWBes49FPf8BvNY1v7d1xP3Kn1",
    callbackURL:"http://127.0.0.1:5000/auth/twitter/callback"
},(accessToken,refreshToken,profile,done)=>{
    console.log(profile);
    StocksDailyUser.findOne({twitterId: profile.id})
    return done(null,profile);
}));
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})
passport.use(new GithubStratergy({
    clientID:"ee6d5118567eba83a0d4",
    clientSecret:"b9ba5f8d070d1a98f1dc660f8ad4d62ced35d677",
    callbackURL:"http://localhost:5000/auth/github/callback"
},(accessToken,refreshToken,profile,done)=>{
    console.log(profile);
    StocksDailyUser.findOne({githubId: profile.id})
    return done(null,profile);
}));
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})