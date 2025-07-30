const cron = require("node-cron");
const ConnectionRequestModel = require("../models/connectionRqst");
const {subDays, startOfDay, endOfDay}=require("date-fns");
const nodemailer = require("nodemailer");

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.APP_MAIL,
        pass:process.env.APP_PASS
    }
})

cron.schedule("00 10 * * *",async()=>{
    console.log("hello world"+new Date());
    try{
        const yes=subDays(new Date(),1)
        const yesterdayStart= startOfDay(yes);
        const yesterdayEnd = endOfDay(yes);
        const pending= await ConnectionRequestModel.find({
            status:"pending",
            createdAt:{
                $gte: yesterdayStart,
                $lt: yesterdayEnd
            }
        }).populate("fromUserId toUserId");

        const listOfEmails=[...new Set(pending.map(req=>req.toUserId.email))]
        console.log(listOfEmails);
        
        for(const email of listOfEmails){
            try{
                await transporter.sendMail({
                    from: process.env.APP_MAIL,
                    to:email,
                    subject:"Pending Connection Requests",
                    text:"Hey DevCommit user, you have pending connection requests from yesterday. Please check your requests."
                })
                console.log(`Email sent to ${email}`);
                
            }catch(err){
                console.log(err);
                
            }
        }
    }catch(err){
        console.log(err);
        
    }
    
})