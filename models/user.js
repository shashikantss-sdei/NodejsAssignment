const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
       
    },

    phone:{
        type:String,
        required:true,
        minlength:10
       
    },

    age:{
        type:String,
        required:true
       
    },
    
    gender:{
        type:String,
        required:true
       
    },
    
},{
   timestamps:true ,
});


// creating collection

const User = new mongoose.model("User",userSchema);
module.exports = User;