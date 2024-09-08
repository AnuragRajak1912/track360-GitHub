const { Schema , model } = require('mongoose');

const userSchema = new Schema({

    name : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
    },

    contactNumber : {
        type : Number,
        required : true,
    },

    role : {
        type : String,
        enum : ['SuperUser','QA','PM','CFO','SE','HR'],
        default : 'SE',
        required : true,
    }

}, { timestamps : true });

const User = model('User',userSchema);
module.exports = User;