const express=require("express");
const app=express(); //creating an instance of express.js
const connectDB=require("./config/db");
const {validateUser}=require("./utils/validation")
const User=require("./models/user")
const bcrypt=require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("./Middlewares/auth")

app.use(express.json()); //to parse JSON data in request body
app.use(cookieParser()); // to parse cookies in request


app.post("/signup",async(req,res)=>{
    validateUser(req);
    const{firstName,lastName,email,password}=req.body;
    //encrypt the password
   const hashpassword=await bcrypt.hash(req.body.password,10)
    console.log(req.body);
    const user=new User({
        firstName,
        lastName,
        email,
        password:hashpassword,

    });

    try{
        await user.save();
        res.status(201).send("User created successfully");
    }catch(err){
        res.status(400).send("Error creating user: " + err.message);
    }
})
app.get("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email:email});
        if(!user){
            res.send("invalid credential")
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
            // Create a JWT token
            const token=await jwt.sign({id:user._id},"dev@tinder$2827",{expiresIn:"1d"});
            // Add the token to cookie and send the response back to user
            res.cookie("token",token,{httpOnly:true});
            res.send("Login successful: "+token)
        }else{
            res.send("Invalid credentials")
        }
    }catch(err){
        res.status(400).send("Error logging in: " + err.message);
    }   
})
app.get("/profile",userAuth, async(req,res)=>{
    const {user}=req;
    res.send(user);
})
app.post("/sendconnection",userAuth,async(req,res)=>{
    res.send("Connection request sent");
})

connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(4000,()=>{
        console.log("Server is running on port 4000");
    })
}).catch((err)=>{
    console.error("Database connection failed:", err);
})
