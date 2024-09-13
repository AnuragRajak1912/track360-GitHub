const { Schema , model } = require('mongoose');

const superUserSchema = new Schema({

    name : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true,
    },

    contactNumber : {
        type : Number,
        required : true,
    },

    role : {
        type : String,
        role : String,
    }

}, { timestamps : true });

const superUser = model('superUser',superUserSchema);
module.exports = superUser;