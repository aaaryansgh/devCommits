const express=require("express");
const app=express(); //creating an instance of express.js
const connectDB=require("./config/db");
const {adminAuth}=require("./Middlewares/auth"); //importing middleware for authentication
const User=require("./models/user")

app.use(express.json()); //to parse JSON data in request body

app.post("/signup",async(req,res)=>{
    const userObj=req.body; //getting user data from request body
    console.log(req.body);
    const user=new User(userObj);
    try{
        await user.save();
        res.status(201).send("User created successfully");
    }catch(err){
        res.status(400).send("Error creating user: " + err.message);
    }
})
//find user by email
app.get("/user",async(req,res)=>{
    const userEmail=req.body.email;
    try{
        const user=User.find({email:userEmail}) //will give me all user having that email id
        res.send(user);
    }catch(err){
        res.send(err.message)
    }
})
app.get("/feed",async(req,res)=>{
    try{
        const user=await User.find({}) //will give me all user having that email id
        res.send(user);
    }catch(err){
        res.send(err.message)
    }
})
app.delete("/user",async(req,res)=>{
    const userid=req.body._id;
    try{
        const user=await User.findByIdAndDelete({_id:userid})
        if(user){
            res.status(200).send("User deleted successfully");
        }else{
            res.status(404).send("User not found");
        }
    }catch(err){
        res.status(400).send(err.message)
    }
})
app.patch("/user",async(req,res)=>{
    const userid=req.body._id;
    const updateData=req.body;
    try{
        const user=await User.findByIdAndUpdate({_id:userid},updateData,{runValidators:true})
        res.send("User updated successfully");
    }catch(err){
        res.status(400).send(err.message)
    }
})

connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(4000,()=>{
        console.log("Server is running on port 4000");
    })
}).catch((err)=>{
    console.error("Database connection failed:", err);
})
