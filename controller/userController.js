const User = require("../models/user");
const config = require("../config/config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");


const userController = {
   signUp:async(req,res)=>{
       try{
          // console.log(req.body);
        const {Name, email, password,phone, age, gender} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User Already exists"});
        }
        if(user == 0){
            return res.status(0).json({message:"User is not active"});
        }
        const passwordhash = await bcrypt.hash(password,10);
        const newUser  = new User({
            Name:Name,
            email:email,
            password:passwordhash,
            phone:phone,
            age:age,
            gender:gender

        });
        await newUser.save();
        return res.status(201).json({
            message:"User Registered Successfully",
            data:newUser
        })
       }catch(err){
           return res.status(500).json({err:err.message})
       }
   }, 

   // login 
   login:async(req,res)=>{
        try{
           // console.log(req.body);
            const {email, password }  =req.body;
            const validate = validator.isEmail(email);
             if(!validate){
                 return res.status(400).json({error:{message:"Invalid Email format"}});
             }
            
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({error:{message:"User is not registered"}});
            }
          const isMatch = await bcrypt.compare(password,user.password);
          if(!isMatch){
              return res.status(400).json({error:{password:"User password does not matched"}})
          }
          const Token  = jwt.sign({
              id:user._id,
    
          },config.SECRET_KEY,{expiresIn:"7d"});
          return res.status(200).json({message:"User Login successfuly",data:user, token:Token})
       }catch(err){
           return res.status(500).json({err:err.message});
       }
   },

   // getAllUser 
   getAllUser:async(req,res)=>{
       try{
         
        const getData = await User.find();
        //console.log(getData);
        return res.status(200).json({
            message:"Success",
            data:getData
        });
       }catch(err){
           return res.status(500).json({err:err.message});
       }
   }
}

module.exports = userController;