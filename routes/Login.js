//creating user and admin login routes
const express=require('express')
const jwt = require('jsonwebtoken');
const User=require('../model/User')
const login= express.Router()
require('dotenv').config()
const bcrypt=require('bcrypt')
//need to encrypt the password
//const validPass = await bcrypt.compare(req.body.password,findUser.password);
//login for admin
login.post('/admin',async(req,res)=>{
    const username = req.body.username;
    const findUser = await User.findOne({username : username});
    if(!findUser) return res.status(401).send("Invalid Username");
    const validPass = await bcrypt.compare(req.body.password,findUser.password) ;
    if(!validPass) return res.status(401).send("Invalid Password");
    if(!findUser.isAdmin) return res.status(401).send("Not an Admin")
    const token = jwt.sign({_id : findUser._id},process.env.TOKEN);

    res.send({token,username});

})
 
//login for users
login.post('/user',async(req,res)=>{
    const username = req.body.username;
    const findUser = await User.findOne({username : username});
    const name=findUser.name;
    if(!findUser) return res.status(401).send("Invalid Username");
    const validPass = await bcrypt.compare(req.body.password,findUser.password) ;
    if(!validPass) return res.status(401).send("Invalid Password");
    
    const token = jwt.sign({_id : findUser._id},process.env.TOKEN);

    res.status(200).send({token,username,name});


})

module.exports=login