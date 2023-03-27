//creating routes for creating user 
const express=require('express')
const createUser= express.Router()
const User=require('../../model/User')
const bcrypt = require('bcrypt');
createUser.post('/',async (req,res)=>{
    const username = req.body.username;
    const name = req.body.name;
    const password=await bcrypt.hash(req.body.password,10);
    //add validation

    if (await User.findOne({ username: username })) return res.send("Username already taken");
    
    const add_user = new User({
        name : name,
        username : username,
        password : password
    });
    try{
        const savedUser = await add_user.save();
        
        res.send(savedUser);
    }catch(err){
        res.send(err);
    }
})
createUser.post('/admin',async (req,res)=>{
    const username = req.body.username;
    const name = req.body.name;
    const password=await bcrypt.hash(req.body.password,10);
    //add validation

    if (await User.findOne({ username: username })) return res.send("Username already taken");
    const add_user = new User({
        
        name : name,
        username : username,
        password : password,
        isAdmin:true
    });
    try{
        const savedUser = await add_user.save();
        
        res.send(savedUser);
    }catch(err){
        res.send(err);
    }
})

module.exports = createUser;