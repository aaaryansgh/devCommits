const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../Middlewares/auth");
const { validateeditdata } = require("../utils/validation");

profileRouter.get("/profile/view",userAuth, async(req,res)=>{
    const {user}=req;
    res.send(user);
})
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateeditdata(req)){
            throw new Error("Invalid fields for edit");
        }
        const {user}=req;
        Object.keys(req.body).forEach((key)=>(user[key]=req.body[key]))
        await user.save();
        res.json({
            message:"Profile updated successfully",
            data:user
        })
        
    }catch(err){
        res.status(400).send(err.message);
    }
})
profileRouter.patch("/profile/edit/password",userAuth,async(req,res)=>{
    const {oldPassword,newPassword}=req.body;
    try{
        const {user}=req;
        const isMatch=await bcrypt.compare(oldPassword,user.password);
        if(!isMatch){
            throw new Error("Old password is incorrect");
        }else{
            user.password=await bcrypt.hash(newPassword,10);
            await user.save();
            res.json({
                message:"Password updated successfully"
            });
        }
    }catch(err){
        res.status(400).send(err.message);
    }
})

module.exports = profileRouter;