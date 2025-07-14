const validator=require('validator');
const validateUser=(req)=>{
    const{firstName,lastName,email,password}=req.body;
    if(!firstName||!lastName||!email||!password){
        throw new Error("All fields are required")
    }
    else if(!validator.isEmail(email)){
        throw new Error("Invalid email format")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password must be at least 6 characters long")
    }
    
}

const validateeditdata=(req)=>{
    const allowedFields=["firstName","lastName","email","age","bio","skills"]
    const isEditAllowed=Object.keys(req.body).every(field=>allowedFields.includes(field))
    return isEditAllowed;
}
module.exports={validateUser,validateeditdata}