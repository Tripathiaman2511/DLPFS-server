const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true 
    },
    username : {
        type : String,
        required : true,
        min : 6,
        max : 20
    },
    password : {
        type : String,
        required : true,
    },
    
    upload : {
        access:{
            type : Boolean,
            default : false
        },
        fileName:{
            type:Array,
            default:[]
        }
        
    },
    review : {
        access:{
            type : Boolean,
            default : false
        },
        fileName:{
            type:Array,
            default:[]
        }
    },
    isAdmin:{
        type:Boolean,
        default:false
    }


    
});

module.exports = mongoose.model('User', UserSchema);