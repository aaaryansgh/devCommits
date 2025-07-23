const express=require("express");
const app=express(); //creating an instance of express.js
const connectDB=require("./config/db");
const cookieParser = require("cookie-parser");
const cors=require("cors")

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(express.json()); //to parse JSON data in request body
app.use(cookieParser()); // to parse cookies in request

const authRouter=require("./routes/authrouter");
const profileRouter=require("./routes/profilerouter");
const requestRouter=require("./routes/requestrouter");
const userRouter = require("./routes/userrouter");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter)
app.use("/",userRouter);

connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(4000,()=>{
        console.log("Server is running on port 4000");
    })
}).catch((err)=>{
    console.error("Database connection failed:", err);
})
