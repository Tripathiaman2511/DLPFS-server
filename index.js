const express =require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const app=express()
app.use(bodyParser.json());
const Upload= require('./routes/Upload')
const Read=require('./routes/Read');
const Login=require('./routes/Login');
const createUser = require('./routes/userRoutes/createUser');
const updateUser = require('./routes/userRoutes/updateUser');
const removeUser = require('./routes/userRoutes/removeUser');
const getUser = require('./routes/userRoutes/getUser');

app.use('/upload',Upload)
app.use('/read',Read)
app.use('/login',Login)
app.use('/createUser',createUser)
app.use('/updateUser',updateUser)
app.use('/removeUser',removeUser)       
app.use('/getUser',getUser)


app.use(cors())


mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGOID)
const db=mongoose.connection
//db.collections.files.deleteMany({})
//db.collections.users.deleteMany({})
db.on('error',(err)=>{
    
    console.log("Not Connect")
})
db.once('open',()=>{
    console.log("Connected")
})
app.listen(5000)