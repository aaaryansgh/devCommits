const adminAuth=(req,res,next)=>{
    const token=1234;
    if(token!==1234){
        res.status(401).send("Unauthorized admin");
    } else{
        next(); //if the token is valid, call next() to pass control to the next middleware or route handler
    }
}
const userAuth=(req,res,next)=>{
    const token=12345;
    if(token!==12345){
        res.status(401).send("Unauthorized user");

    }else{
        next();
    }
}
module.exports={
    adminAuth,userAuth
}