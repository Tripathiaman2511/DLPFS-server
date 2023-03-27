const express=require('express')
const File = require('../model/File')
const read= express.Router()
const fs=require('fs')
const ReadFunction = require('../fileHandling/ReadFunction')
//get all files data
read.get('/',(req,res)=>{
    File.find((err,data)=>{
        if(data){
         return res.send(data)
        }
        return res.send([])
    })
    
})
//reading a specific file
read.get('/preview/:api',async (req,res)=>{
    
   const {fileName,otherData,path}=req.query
   const modifiedOtherData={
    write:otherData.write==='true',
    read:otherData.read==='true',
    operation:{
        masked:otherData.operation.masked==='true',
        replacement:otherData.operation.replacement==='true'
    }
}
   
    if(modifiedOtherData.read){
        
        ReadFunction(fileName,modifiedOtherData,path,(data)=>{
           console.log("Content Generated.")
            res.send(data)
        })
    }
    else if(!modifiedOtherData.read){
        console.log("No operation needed.")
        const data=fs.readFileSync(`C:\\Users\\amand\\Desktop\\prototype\\server\\Storage\\perFiles\\${fileName}`,'utf-8')
        res.send(data)
    }
    
    
   
})

module.exports = read;