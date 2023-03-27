const express=require('express')
const upload= express.Router()
const multer=require('multer');
const writeFunction = require('../fileHandling/writeFunction');
const {createStorage, updateDatabase, uploadUpdate}= require('../Storage/storeFunction');


upload.post('/temp',  multer({storage:createStorage('tempFiles')}).single('file'),async (req,res)=>{
    console.log(req.file)
    console.log("Need to do Write Operation...")
    const status= writeFunction(req.file,JSON.parse(req.body.otherData),req.body.username)
    res.status(status)
})

upload.post('/', multer({storage:createStorage('perFiles')}).single('file'),(req,res)=>{
    console.log("No Need to do Read Operation...")
    const status =updateDatabase(req.file.filename,JSON.parse(req.body.otherData),req.file.path,()=>{
        return uploadUpdate(req.body.username,req.file.filename)
    })
    res.status(status)
})



module.exports = upload;