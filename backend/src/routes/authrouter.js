const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const authRouter=express.Router();
const User=require("../models/user")

authRouter.post("/signup",async(req,res)=>{ 
    const {firstName,lastName,email,password}=req.body;
    const hashpassword=await bcrypt.hash(password,10);
    const user=new User({
        firstName,
        lastName,
        email,
        password:hashpassword
    }) 
    try{
        await user.save();
        res.status(201).send("user created successfully")
    }catch(err){
        res.status(400).send(err.message);
    }

})

authRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email:email});
        if(!user) return res.status(400).send("Invalid credentials");
        const isMatch=await bcrypt.compare(password,user.password);
        if(isMatch){
            const token=await jwt.sign({id:user._id},"devtinder@2827",{expiresIn:"1d"})
            res.cookie("token",token);
            res.send("Login successful: " + token);
        }else{
            res.status(400).send("Invalid credentials");
        }
    }catch(err){
        res.status(400).send(err);
    }
})

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{expires: new Date(Date.now())})
    res.send("Logout successful")
})

module.exports=authRouter;