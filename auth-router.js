const express=require("express");
const route=express.Router()
const {User}=require("./user-model")
const jwt=require("jsonwebtoken")
const Joi=require("joi")
const bcrypt=require("bcrypt")
const auth=require("./auth-token-middleware")

route.post("/",async(req,res)=>{
    const {error}=validate(req.body)
    if(error) return res.status(404).send(error.details[0].message)
    let user=await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send("invalid username")
    const validPassword=await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.status(400).send("password is invalid")
    const token=user.generateAuthToken()
    res.send(token)
})
function validate(user){
    const schema={
        email:Joi.string().min(3).max(50).required().email(),
        password:Joi.string().min(5).max(50).required()}
        return Joi.validate(user,schema)
}
module.exports=route
