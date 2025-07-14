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

module.exports = profileRouter;