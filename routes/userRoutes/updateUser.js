const express=require('express')
const updateUser= express.Router()
const User=require('../../model/User')

updateUser.post('/',async(req,res)=>{
    const username = req.body.username;
    const upload =req.body.upload.access;
    const review=req.body.review.access;


    try{
        const filter={username:username}
       
        const update=await User.findOneAndUpdate(filter,{'upload.access':upload,'review.access':review},{new:true})
        res.status(200).send(update);
    }
    catch(err){
        res.send(err);
    } 

})

updateUser.post('/upload',async(req,res)=>{
    const username=req.body.username
    const fileName=req.body.fileName
    try{
        const user=await User.findOne({username:username})
        if(user.upload.access){
            const update=await User.findOneAndUpdate({username:username},{$push:{'upload.fileName':fileName}},{new:true})
            res.status(200).send(update)
        }
        else{
            res.status(500).send("No Access")
        }
    }catch(err){
        res.send(err)
    }
})
//user download will show which file user has downloaded 
updateUser.post('/review',async(req,res)=>{
    const username=req.body.username
    const fileName=req.body.fileName
    try{
        const user=await User.findOne({username:username})
        const file=user.review.fileName.includes(fileName)
      
        if(file) return res.send("Already Downloaded")
        if(user.review.access){
            const update=await User.findOneAndUpdate({username:username},{$push:{'review.fileName':fileName}},{new:true})
            res.status(200).send(update)
        }
        else{
            res.status(500).send("No Access")
        }
    }catch(err){
        res.send(err)
    }
})

module.exports=updateUser