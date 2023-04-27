const express = require('express');
const { UserModel } = require("../models/user.model");
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');
userRouter.get("/",(req,res)=>{
    res.send("user home")
});


// sigup

userRouter.post("/signup",async(req,res)=>{
    let {profile,name,email,password,bio,phone} =req.body;
    try {   
        let user = await UserModel.find({email})
        if(user.length > 0){
            res.status(400).send({message:"user already exists"});
        }else{

            bcrypt.hash(password, 5, async function(err, hash) {
                let newuser = new UserModel({name,email,profile,bio,phone,password : hash});
                console.log(newuser);
                await newuser.save();
                res.status(200).send({message:"user signed up successfully"});
            });

        }
        
    } catch (error) {
        res.status(500).send({message:error.message})
    }
});


// sigup

userRouter.post("/login",async(req,res)=>{
    let {email,password} =req.body;
    try {   
        let user = await UserModel.find({email})
        if(user.length !== 0){
            let hashPassword = user[0].password;
            bcrypt.compare(password, hashPassword,async (err,result)=>{
                if(result){
                    let token = jwt.sign({userId : user[0]._id},'auth',{expiresIn: '7d'})
                    console.log(token);
                    res.send({message:"login success",token,userId:user[0]._id});
                }else{
                    res.send({message:"login failed "})
                }
            })
        }
        
    } catch (error) {
        res.status(500).send({message:error.message})
    }
});


module.exports = {userRouter}
