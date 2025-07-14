const jwt=require("jsonwebtoken");
const User=require("../models/user")
const userAuth=async(req,res,next)=>{
    const cookie=req.cookies;
    const {token}=cookie;
    if(!token){
        throw new Error("No token provided");
    }
    const validtoken=await jwt.verify(token,"devtinder@2827");
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