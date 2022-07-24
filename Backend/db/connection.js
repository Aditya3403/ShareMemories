const mongoose = require("mongoose");
const url = "mongodb+srv://user:userforapp@crudapp.djxuw.mongodb.net/CRUDAPP?retryWrites=true&w=majority";

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("connection is successful..");
}).catch((error)=>{
    console.log(error);
})