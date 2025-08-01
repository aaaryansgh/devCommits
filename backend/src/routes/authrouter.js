const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const authRouter=express.Router();
const User=require("../models/user")
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.APP_MAIL, // Use your email address
    pass: process.env.APP_PASS, // Use an app password if 2FA is enabled
  }
});

const sendWelcomeEmail = async (userEmail, userName) => {
  const mailOptions = {
    from: "aryan2send@gmail.com",
    to: userEmail,
    subject: 'Welcome to Our App!',
    html: `<h2>Hello ${userName},</h2><p>Thanks for signing up!</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


authRouter.post("/signup",async(req,res)=>{ 
    const {firstName,lastName,email,password,age,gender,bio,skills}=req.body;
    const hashpassword=await bcrypt.hash(password,10);
    const user=new User({
        firstName,
        lastName,
        email,
        password:hashpassword,
        age,
        gender,
        bio,
        skills
    }) 
    try{
        await user.save();
        await sendWelcomeEmail(email, firstName);
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
            res.send(user);
        }else{
            res.status(400).send("Invalid credentials");
        }
    }catch(err){
        res.status(400).send("Invalid credentials");
    }
})

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{expires: new Date(Date.now())})
    res.send("Logout successful")
})

module.exports=authRouter;