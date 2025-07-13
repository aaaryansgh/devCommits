const jwt=require("jsonwebtoken");
const User=require("../models/user")
const userAuth=async(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        throw new Error("No token provided");
    }
    const validtoken=await jwt.verify(token,"dev@tinder$2827");
    const{id}=validtoken;
    const user=await User.findById(id);
    if(!user){
        res.status(401).send("User not found");
    }else{
        req.user=user;
        console.log(user);
        next();
    }
}
module.exports={
    userAuth
}